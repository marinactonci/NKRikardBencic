<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 500px">
      <q-table
        v-if="isMounted"
        title="kartas"
        :data="kartas"
        :columns="columns"
        row-key="UIDkarta"
        flat
      >
        <template v-slot:top>
          <q-btn color="primary" label="Add karta" @click="onNewRow" />
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.name === 'actions'">
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
            Karta
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Datum"
            :error="!karta.datum || karta.datum.length === 0"
            error-message="Datum is required."
            label="Datum"
            v-model="karta.datum"
          />
          <q-input
            ref="Cijena"
            :error="!karta.cijena || karta.datum.cijena === 0"
            error-message="Cijena is required."
            label="Cijena"
            v-model="karta.cijena"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
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
      karta: null,
      kartaModel: {
        UIDkarta: null,
        datum: null,
        cijena: null
      },
      isMounted: false,
      kartas: [],
      columns: [
        {
          name: 'datum',
          label: 'Datum',
          align: 'left',
          field: 'datum',
          sortable: true
        },
        {
          name: 'cijena',
          label: 'Cijena',
          align: 'left',
          field: 'cijena',
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
    const collectionRef = this.$db.collection('karta')
    collectionRef.get().then(rows => {
      rows.forEach(row => {
        this.kartas.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.karta = JSON.parse(JSON.stringify(this.kartaModel))
      this.openDialog = true
    },
    onOKClick () {
      if (!this.$refs.Datum.hasError && !this.$refs.Cijena.hasError) {
        const collectionRef = this.$db.collection('karta')
        if (this.karta.UIDkarta === null) {
          collectionRef
            .add(this.karta)
            .then(doc => {
              this.karta.UIDkarta = doc.id
              const docRef = this.$db.collection('karta').doc(doc.id)
              docRef
                .update({ UIDkarta: doc.id })
                .then(response => {
                  this.karta.UIDkarta = doc.id
                  this.kartas.push(this.karta)
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
          const docRef = this.$db.collection('karta').doc(this.karta.UIDkarta)
          docRef
            .set(this.karta)
            .then(response => {
              const karta = this.kartas.find(
                karta => karta.UIDkarta === this.karta.UIDkarta
              )
              if (karta) {
                for (const attributeName in this.karta) {
                  karta[attributeName] = JSON.parse(
                    JSON.stringify(this.karta[attributeName])
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
    onUpdateRow (karta) {
      this.karta = JSON.parse(JSON.stringify(this.kartaModel))
      for (const attributeName in this.karta) {
        this.karta[attributeName] = JSON.parse(
          JSON.stringify(karta[attributeName])
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
          const docRef = this.$db.collection('karta').doc(row.UIDkarta)
          docRef
            .delete()
            .then(() => {
              const index = this.kartas.findIndex(
                karta => karta.UIDkarta === row.UIDkarta
              )
              if (index >= 0) {
                this.kartas.splice(index, 1)
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
