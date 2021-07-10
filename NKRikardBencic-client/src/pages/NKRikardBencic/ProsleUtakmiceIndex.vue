<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 800px">
      <q-table
        v-if="isMounted"
        title="prosleUtakmices"
        :data="prosleUtakmices"
        :columns="columns"
        row-key="UIDprosleUtakmice"
        flat
      >
        <template v-slot:top>
          <q-btn color="black" label="Add Prošle Utakmice" @click="onNewRow" />
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
            Prošle Utakmice
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Datum"
            :error="!prosleUtakmice.datum || prosleUtakmice.datum.length === 0"
            error-message="Datum is required."
            label="Datum"
            v-model="prosleUtakmice.datum"
          />
          <q-input
            ref="Domaci"
            :error="!prosleUtakmice.domaci || prosleUtakmice.domaci.length === 0"
            error-message="Domaci is required."
            label="Domaci"
            v-model="prosleUtakmice.domaci"
          />
          <q-input
            ref="Gosti"
            :error="!prosleUtakmice.gosti || prosleUtakmice.gosti.length === 0"
            error-message="Gosti is required."
            label="Gosti"
            v-model="prosleUtakmice.gosti"
          />
          <q-input
            ref="Rezultat"
            :error="!prosleUtakmice.rezultat || prosleUtakmice.rezultat.length === 0"
            error-message="Rezultat is required."
            label="Rezultat"
            v-model="prosleUtakmice.rezultat"
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
  name: 'ProsleUtakmiceIndex',
  data () {
    return {
      openDialog: false,
      prosleUtakmice: null,
      prosleUtakmiceModel: {
        UIDprosleUtakmice: null,
        datum: null,
        domaci: null,
        gosti: null,
        rezultat: null
      },
      isMounted: false,
      prosleUtakmices: [],
      columns: [
        {
          name: 'datum',
          label: 'Datum',
          align: 'left',
          field: 'datum',
          sortable: true
        },
        {
          name: 'domaci',
          label: 'Domaci',
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
          name: 'rezultat',
          label: 'Rezultat',
          align: 'left',
          field: 'rezultat',
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
    const collectionRef = this.$db.collection('prosleUtakmice')
    collectionRef.get().then(rows => {
      rows.forEach(row => {
        this.prosleUtakmices.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.prosleUtakmice = JSON.parse(JSON.stringify(this.prosleUtakmiceModel))
      this.openDialog = true
    },
    onOKClick () {
      if (!this.$refs.Datum.hasError && !this.$refs.Domaci.hasError && !this.$refs.Gosti.hasError && !this.$refs.Rezultat.hasError) {
        const collectionRef = this.$db.collection('prosleUtakmice')
        if (this.prosleUtakmice.UIDprosleUtakmice === null) {
          collectionRef
            .add(this.prosleUtakmice)
            .then(doc => {
              this.prosleUtakmice.UIDprosleUtakmice = doc.id
              const docRef = this.$db.collection('prosleUtakmice').doc(doc.id)
              docRef
                .update({ UIDprosleUtakmice: doc.id })
                .then(response => {
                  this.prosleUtakmice.UIDprosleUtakmice = doc.id
                  this.prosleUtakmices.push(this.prosleUtakmice)
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
          const docRef = this.$db.collection('prosleUtakmice').doc(this.prosleUtakmice.UIDprosleUtakmice)
          docRef
            .set(this.prosleUtakmice)
            .then(response => {
              const prosleUtakmice = this.prosleUtakmices.find(
                prosleUtakmice => prosleUtakmice.UIDprosleUtakmice === this.prosleUtakmice.UIDprosleUtakmice
              )
              if (prosleUtakmice) {
                for (const attributeName in this.prosleUtakmice) {
                  prosleUtakmice[attributeName] = JSON.parse(
                    JSON.stringify(this.prosleUtakmice[attributeName])
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
    onUpdateRow (prosleUtakmice) {
      this.prosleUtakmice = JSON.parse(JSON.stringify(this.prosleUtakmiceModel))
      for (const attributeName in this.prosleUtakmice) {
        this.prosleUtakmice[attributeName] = JSON.parse(
          JSON.stringify(prosleUtakmice[attributeName])
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
          const docRef = this.$db.collection('prosleUtakmice').doc(row.UIDprosleUtakmice)
          docRef
            .delete()
            .then(() => {
              const index = this.prosleUtakmices.findIndex(
                prosleUtakmice => prosleUtakmice.UIDprosleUtakmice === row.UIDprosleUtakmice
              )
              if (index >= 0) {
                this.prosleUtakmices.splice(index, 1)
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
