<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 800px">
      <q-table
        v-if="isMounted"
        title="nadolazeceUtakmices"
        :data="nadolazeceUtakmices"
        :columns="columns"
        row-key="UIDnadolazeceUtakmice"
        flat
      >
        <template v-slot:top>
          <q-btn color="black" label="Add Nadolazece Utakmice" @click="onNewRow" />
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.name === 'actions'">
              <q-btn
                dense
                color="black"
                icon="edit"
                @click="onUpdateRow(props.row)"
              />
              <q-btn
                dense
                color="black"
                icon="delete"
                @click="onDeleteRow(props.row)"
              />
            </div>
            <div v-else>
              {{ props.row[props.col.field] }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-if="openDialog" v-model="openDialog">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">
            Nadolazeće Utakmice
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Datum"
            :error="!nadolazeceUtakmice.datum || nadolazeceUtakmice.datum.length === 0"
            error-message="Datum is required."
            label="Datum"
            v-model="nadolazeceUtakmice.datum"
          />
          <q-input
            ref="Vrijeme"
            :error="!nadolazeceUtakmice.vrijeme || nadolazeceUtakmice.vrijeme.lenght === 0"
            error-message="Vrijeme is required."
            label="Vrijeme"
            v-model="nadolazeceUtakmice.vrijeme"
          />
          <q-input
            ref="Domaci"
            :error="!nadolazeceUtakmice.domaci || nadolazeceUtakmice.domaci.length === 0"
            error-message="Domaći is required."
            label="Domaći"
            v-model="nadolazeceUtakmice.domaci"
          />
          <q-input
            ref="Gosti"
            :error="!nadolazeceUtakmice.gosti || nadolazeceUtakmice.gosti.length === 0"
            error-message="Gosti is required."
            label="Gosti"
            v-model="nadolazeceUtakmice.gosti"
          />
          <q-input
            ref="Stadion"
            :error="!nadolazeceUtakmice.stadion || nadolazeceUtakmice.stadion.length === 0"
            error-message="Stadion is required."
            label="Stadion"
            v-model="nadolazeceUtakmice.stadion"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="black" label="OK" @click="onOKClick" />
          <q-btn color="black" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'NadolazeceUtakmiceIndex',
  data () {
    return {
      openDialog: false,
      nadolazeceUtakmice: null,
      nadolazeceUtakmiceModel: {
        UIDnadolazeceUtakmice: null,
        datum: null,
        vrijeme: null,
        domaci: null,
        gosti: null,
        stadion: null
      },
      isMounted: false,
      nadolazeceUtakmices: [],
      columns: [
        {
          name: 'datum',
          label: 'Datum',
          align: 'left',
          field: 'datum',
          sortable: true
        },
        {
          name: 'vrijeme',
          label: 'Vrijeme',
          align: 'left',
          field: 'vrijeme',
          sortable: true
        },
        {
          name: 'domaci',
          label: 'Domaći',
          align: 'left',
          field: 'domaci',
          sortable: true
        },
        {
          name: 'gosti',
          label: 'Gosti',
          align: 'left',
          field: 'gosti',
          sortable: true
        },
        {
          name: 'stadion',
          label: 'Stadion',
          align: 'left',
          field: 'stadion',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Akcije',
          align: 'left',
          field: null,
          sortable: false
        }
      ]
    }
  },
  mounted: function () {
    const collectionRef = this.$db.collection('nadolazeceUtakmice')
    collectionRef.get().then(rows => {
      rows.forEach(row => {
        this.nadolazeceUtakmices.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.nadolazeceUtakmice = JSON.parse(JSON.stringify(this.nadolazeceUtakmiceModel))
      this.openDialog = true
    },
    onOKClick () {
      if (!this.$refs.Datum.hasError && !this.$refs.Vrijeme.hasError && !this.$refs.Domaci.hasError && !this.$refs.Gosti.hasError && !this.$refs.Stadion.hasError) {
        const collectionRef = this.$db.collection('nadolazeceUtakmice')
        if (this.nadolazeceUtakmice.UIDnadolazeceUtakmice === null) {
          collectionRef
            .add(this.nadolazeceUtakmice)
            .then(doc => {
              this.nadolazeceUtakmice.UIDnadolazeceUtakmice = doc.id
              const docRef = this.$db.collection('nadolazeceUtakmice').doc(doc.id)
              docRef
                .update({ UIDnadolazeceUtakmice: doc.id })
                .then(response => {
                  this.nadolazeceUtakmice.UIDnadolazeceUtakmice = doc.id
                  this.nadolazeceUtakmices.push(this.nadolazeceUtakmice)
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
          const docRef = this.$db.collection('nadolazeceUtakmice').doc(this.nadolazeceUtakmice.UIDnadolazeceUtakmice)
          docRef
            .set(this.nadolazeceUtakmice)
            .then(response => {
              const nadolazeceUtakmice = this.nadolazeceUtakmices.find(
                nadolazeceUtakmice => nadolazeceUtakmice.UIDnadolazeceUtakmice === this.nadolazeceUtakmice.UIDnadolazeceUtakmice
              )
              if (nadolazeceUtakmice) {
                for (const attributeName in this.nadolazeceUtakmice) {
                  nadolazeceUtakmice[attributeName] = JSON.parse(
                    JSON.stringify(this.nadolazeceUtakmice[attributeName])
                  )
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
    onUpdateRow (nadolazeceUtakmice) {
      this.nadolazeceUtakmice = JSON.parse(JSON.stringify(this.nadolazeceUtakmiceModel))
      for (const attributeName in this.nadolazeceUtakmice) {
        this.nadolazeceUtakmice[attributeName] = JSON.parse(
          JSON.stringify(nadolazeceUtakmice[attributeName])
        )
      }
      this.openDialog = true
    },
    onDeleteRow (row) {
      this.$q
        .dialog({
          title: 'Delete',
          message: 'Confirm deletion.',
          ok: true,
          cancel: true
        })
        .onOk(() => {
          const docRef = this.$db.collection('nadolazeceUtakmice').doc(row.UIDnadolazeceUtakmice)
          docRef
            .delete()
            .then(() => {
              const index = this.nadolazeceUtakmices.findIndex(
                nadolazeceUtakmice => nadolazeceUtakmice.UIDnadolazeceUtakmice === row.UIDnadolazeceUtakmice
              )
              if (index >= 0) {
                this.nadolazeceUtakmices.splice(index, 1)
              }
            })
            .catch(error => {
              console.error('Error removing document: ', error)
            })
        })
    }
  }
}
</script>
