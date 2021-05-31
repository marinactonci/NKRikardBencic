<template>
    <div class="q-pa-lg row justify-center">
        <div
            class="col"
            style="max-width: 500px"
        >
            <q-table
                v-if="isMounted"
                title="Karte"
                :data="sensors"
                :columns="columns"
                row-key="sifraKarte"
                flat
            >
                <template v-slot:top>
                    <q-btn
                        color="primary"
                        label="Dodaj"
                        @click="onNewRow"
                    />
                </template>
                <template v-slot:body-cell="props">
                    <q-td :props="props">
                        <div v-if="props.col.name==='actions'">
                            <q-btn
                                dense
                                color="primary"
                                icon="edit"
                                @click="onUpdateRow(props.row)"
                            />
                            <q-btn
                                dense
                                color="primary"
                                icon="delete"
                                @click="onDeleteRow(props.row)"
                            />
                        </div>
                        <div v-else>
                            {{props.row[props.col.field]}}
                        </div>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog
            v-if="openDialog"
            v-model="openDialog"
        >
            <q-card class="q-dialog-plugin">
                <q-card-section>
                    <div class="text-h6">
                        Karta
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-input
                        ref="Cijena"
                        :error="!sensor.unitOfMeasure || sensor.type.unitOfMeasure === 0"
                        error-message="Cijena je obavezna."
                        label="Cijena"
                        v-model="sensor.unitOfMeasure"
                    />
                    <q-input
                        ref="Datum"
                        :error="!sensor.type || sensor.type.lenght === 0"
                        error-message="Datum je obavezan."
                        label="Datum"
                        v-model="sensor.type"
                    />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        color="primary"
                        label="OK"
                        @click="onOKClick"
                    />
                    <q-btn
                        color="primary"
                        label="Cancel"
                        @click="onCancelClick"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
export default {
  name: 'KartaIndex',
  data () {
    return {
      openDialog: false,
      sensor: null,
      sensorModel: {
        UIDSensor: null,
        type: null,
        unitOfMeasure: null
      },
      isMounted: false,
      sensors: [],
      columns: [
        {
          name: 'type',
          label: 'Type',
          align: 'left',
          field: 'type',
          sortable: true
        },
        {
          name: 'unitOfMeasure',
          label: 'Unit of Measure',
          align: 'left',
          field: 'unitOfMeasure',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'left',
          field: null,
          sortable: false
        }
      ]
    }
  },
  mounted: function () {
    const collectionRef = this.$db.collection('karta')
    collectionRef.get()
      .then((rows) => {
        rows.forEach((row) => {
          this.sensors.push(row.data())
        })
        this.isMounted = true
      })
  },
  methods: {
    onNewRow () {
      this.sensor = JSON.parse(JSON.stringify(this.sensorModel))
      this.openDialog = true
    },
    onOKClick () {
      if (!this.$refs.type.hasError && !this.$refs['Unit Of Measure'].hasError) {
        const collectionRef = this.$db.collection('karta')
        if (this.sensor.UIDSensor === null) {
          collectionRef.add(this.sensor)
            .then((doc) => {
              this.sensor.UIDSensor = doc.id
              const docRef = this.$db.collection('karta').doc(doc.id)
              docRef.update({ UIDSensor: doc.id })
                .then((response) => {
                  this.sensor.UIDSensor = doc.id
                  this.sensors.push(this.sensor)
                  this.openDialog = false
                })
                .catch(function (error) {
                  console.error('Error adding document: ', error)
                })
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        } else {
          const docRef = this.$db.collection('karta').doc(this.sensor.UIDSensor)
          docRef.set(this.sensor)
            .then((response) => {
              const sensor = this.sensors.find(sensor => sensor.UIDSensor === this.sensor.UIDSensor)
              if (sensor) {
                for (const attributeName in this.sensor) {
                  sensor[attributeName] = JSON.parse(JSON.stringify(this.sensor[attributeName]))
                }
              }
              this.openDialog = false
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        }
      }
    },
    onCancelClick () {
      this.openDialog = false
    },
    onUpdateRow (sensor) {
      this.sensor = JSON.parse(JSON.stringify(this.sensorModel))
      for (const attributeName in this.sensor) {
        this.sensor[attributeName] = JSON.parse(JSON.stringify(sensor[attributeName]))
      }
      this.openDialog = true
    },
    onDeleteRow (row) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Confirm deletion.',
        ok: true,
        cancel: true
      }).onOk(() => {
        const docRef = this.$db.collection('karta').doc(row.UIDSensor)
        docRef.delete()
          .then(() => {
            const index = this.sensors.findIndex(sensor => sensor.UIDSensor === row.UIDSensor)
            if (index >= 0) {
              this.sensors.splice(index, 1)
            }
          }).catch((error) => {
            console.error('Error removing document: ', error)
          })
      })
    }
  }
}
</script>
