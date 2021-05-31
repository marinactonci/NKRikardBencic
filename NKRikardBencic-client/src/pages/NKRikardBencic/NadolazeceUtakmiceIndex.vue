<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 900px">
      <div class="q-pb-md">
        <q-btn
          color="primary"
          label="Add meteo station"
          @click="onNewMeteoStation"
        />
      </div>
      <q-list bordered>
        <div
          v-for="(meteoStation, meteoStationIndex) in meteoStations"
          :key="meteoStation.UIDMeteoStation"
        >
          <q-expansion-item
            group="meteoStations"
            :label="meteoStation.name"
            :default-opened="meteoStationIndex === 0"
            header-class="bg-grey text-bold"
            dense
          >
            <q-card>
              <q-card-actions align="right">
                <q-btn
                  dense
                  color="primary"
                  icon="edit"
                  @click="onUpdateMeteoStation(meteoStation)"
                />
                <q-btn
                  dense
                  color="primary"
                  icon="delete"
                  @click="onDeleteMeteoStation(meteoStation)"
                />
              </q-card-actions>
              <q-separator />
              <q-card-section>
                <div class="row">
                  <div class="col-6 q-pr-xs">
                    <q-input
                      readonly
                      dense
                      label="Name"
                      v-model="meteoStation.name"
                    />
                    <q-input
                      readonly
                      dense
                      label="Description"
                      v-model="meteoStation.description"
                    />
                    <div class="row">
                      <div class="col">
                        <q-input
                          readonly
                          dense
                          label="Latitude"
                          v-model="meteoStation.geoPoint.Latitude"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          readonly
                          dense
                          label="Longitude"
                          v-model="meteoStation.geoPoint.Longitude"
                        />
                      </div>
                    </div>
                    <q-input
                      readonly
                      dense
                      label="ID meteo station"
                      v-model="meteoStation.IDMeteoStation"
                    />
                  </div>
                  <div class="col-6 q-pl-xs">
                    <div class="text-center q-pa-xs">
                      <croppa
                        ref="croppa"
                        crossOrigin="anonymous"
                        :width="150"
                        :height="150"
                        :accept="'image/*'"
                        :prevent-white-space="true"
                        :placeholder-font-size="18"
                        :file-size-limit="1 * 1024 * 1024"
                        :quality="1"
                        :remove-button-color="'red'"
                        :remove-button-size="30"
                        placeholder="Choose image"
                        :disable-drag-to-move="!uploadButton"
                        v-model="meteoStation.photo"
                        :initialimage="
                          meteoStation.urlImage
                            ? meteoStation.urlImage
                            : initialImage
                            ? initialImage
                            : null
                        "
                        @image-remove="removeImage(meteoStation)"
                        @file-type-mismatch="onError('File type mismatch')"
                        @file-size-exceed="onError('File size exceed')"
                        @file-choose="uploadButton = true"
                      >
                      </croppa>
                      <q-btn
                        flat
                        color="primary"
                        v-if="uploadButton"
                        class="full-width"
                        @click="uploadCroppedImage(meteoStation)"
                        label="Set image"
                        icon="image"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-bold">Sensors</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div class="q-pb-md">
                      <q-btn
                        color="primary"
                        label="Add sensor"
                        @click="onNewMeteoStationSensor(meteoStation)"
                      />
                    </div>
                    <q-list bordered>
                      <div
                        v-for="(meteoStationSensor,
                        meteoStationSensorIndex) in meteoStation.meteoStationSensors"
                        :key="meteoStationSensor.UIDMeteoStationSensor"
                      >
                        <q-expansion-item
                          group="meteoStationSensors"
                          :label="
                            meteoStationSensor.sensor
                              ? meteoStationSensor.description +
                                ' [' +
                                meteoStationSensor.sensor.type +
                                ']'
                              : meteoStationSensor.description
                          "
                          :default-opened="meteoStationSensorIndex === 0"
                          header-class="bg-blue-1 text-bold"
                          dense
                        >
                          <q-card>
                            <q-card-actions align="right">
                              <q-btn
                                dense
                                color="primary"
                                icon="edit"
                                @click="
                                  onUpdateMeteoStationSensor(
                                    meteoStation,
                                    meteoStationSensor
                                  )
                                "
                              />
                              <q-btn
                                dense
                                color="primary"
                                icon="delete"
                                @click="
                                  onDeleteMeteoStationSensor(
                                    meteoStation,
                                    meteoStationSensor
                                  )
                                "
                              />
                            </q-card-actions>
                            <q-separator />
                            <q-card-section>
                              <div class="row">
                                <div class="col-6 q-pr-xs">
                                  <q-input
                                    vif="meteoStationSensor.sensor"
                                    label="Sensor"
                                    readonly
                                    dense
                                    vmodel="meteoStationSensor.sensor.type"
                                  />
                                  <q-input
                                    label="Description"
                                    type="textarea"
                                    readonly
                                    dense
                                    vmodel="meteoStationSensor.description"
                                  />
                                </div>
                                <div class="col-6 q-pl-xs">
                                  <div class="row">
                                    <div class="col">
                                      <q-input
                                        label="Lower limit"
                                        type="number"
                                        readonly
                                        dense
                                        vmodel="meteoStationSensor.lowerLimit"
                                      />
                                    </div>
                                    <div class="col">
                                      <q-input
                                        label="Upper limit"
                                        type="number"
                                        readonly
                                        dense
                                        vmodel="meteoStationSensor.upperLimit"
                                      />
                                    </div>
                                  </div>
                                  <q-input
                                    label="Sensor ID"
                                    readonly
                                    dense
                                    vmodel="meteoStationSensor.IDSensor"
                                  />
                                </div>
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </q-list>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator />
        </div>
      </q-list>
    </div>
    <q-dialog v-if="openMeteoStationDialog" v-model="openMeteoStationDialog">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">Meteo station</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Name"
            :error="!meteoStation.name || meteoStation.name.length === 0"
            error-message="Name is required."
            label="Name"
            v-model="meteoStation.name"
          />
          <q-input
            label="Description"
            type="textarea"
            v-model="meteoStation.description"
          />
          <div class="row">
            <div class="col">
              <q-input
                ref="Latitude"
                :error="
                  !meteoStation.geoPoint.Latitude &&
                    meteoStation.geoPoint.Latitude !== 0
                "
                error-message="Latitude is required."
                label="Latitude"
                type="number"
                v-model.number="meteoStation.geoPoint.Latitude"
              />
            </div>
            <div class="col">
              <q-input
                ref="Longitude"
                :error="
                  !meteoStation.geoPoint.Longitude &&
                    meteoStation.geoPoint.Longitude !== 0
                "
                error-message="Longitude is required."
                label="Longitude"
                type="number"
                v-model.number="meteoStation.geoPoint.Longitude"
              />
            </div>
          </div>
          <q-input
            label="Meteo station ID"
            v-model="meteoStation.IDMeteoStation"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="OK"
            @click="onOKMeteoStationDialogClick"
          />
          <q-btn
            color="primary"
            label="Cancel"
            @click="onCancelMeteoStationDialogClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-if="openMeteoStationSensorDialog"
      v-model="openMeteoStationSensorDialog"
    >
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">Sensor</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-select
            label="Sensor"
            dense
            v-model="meteoStationSensor.sensor"
            :options="sensors"
            option-value="UIDSensor"
            option-label="type"
          />
          <q-input
            label="Description"
            type="textarea"
            v-model="meteoStationSensor.description"
          />
          <div class="row">
            <div class="col">
              <q-input
                label="Lower limit"
                type="number"
                v-model.number="meteoStationSensor.lowerLimit"
              />
            </div>
            <div class="col">
              <q-input
                label="Upper limit"
                type="number"
                v-model.number="meteoStationSensor.upperLimit"
              />
            </div>
          </div>
          <q-input label="Sensor ID" v-model="meteoStationSensor.IDSensor" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="OK"
            @click="onOKMeteoStationSensorDialogClick"
          />
          <q-btn
            color="primary"
            label="Cancel"
            @click="onCancelMeteoStationSensorDialogClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { component as croppa } from 'vue-croppa'
export default {
  name: 'MeteoStationsIndex',
  components: {
    croppa
  },
  data () {
    return {
      isMounted: false,
      openMeteoStationDialog: false,
      openMeteoStationSensorDialog: false,
      meteoStations: [],
      meteoStation: null,
      meteoStationModel: {
        UIDMeteoStation: null,
        geoPoint: {
          Latitude: null,
          Longitude: null
        },
        name: null,
        description: null,
        urlImage: null,
        IDMeteoStation: null
      },
      currentMeteoStation: null,
      meteoStationSensor: null,
      meteoStationSensorModel: {
        UIDMeteoStation: null,
        UIDMeteoStationSensor: null,
        sensor: null,
        description: null,
        lowerLimit: null,
        upperLimit: null,
        IDSensor: null
      },
      uploadButton: false,
      initialImage: null,
      sensors: []
    }
  },
  mounted: async function () {
    let collectionRef = this.$db.collection('meteostation')
    await collectionRef.get().then(meteoStations => {
      meteoStations.forEach(async meteoStation => {
        const meteoStationFromDB = meteoStation.data()
        this.$set(meteoStationFromDB, 'meteoStationSensors', [])
        this.$set(meteoStationFromDB, 'photo', {})
        const subCollectionRef = collectionRef
          .doc(meteoStation.data().UIDMeteoStation)
          .collection('meteostationsensor')
        await subCollectionRef.get().then(meteoStationSensors => {
          const meteoStationSensorsFromDB = []
          meteoStationSensors.forEach(meteoStationSensor => {
            meteoStationSensorsFromDB.push(meteoStationSensor.data())
          })
          meteoStationFromDB.meteoStationSensors = meteoStationSensorsFromDB
          this.meteoStations.push(meteoStationFromDB)
          this.isMounted = true
        })
      })
    })
    collectionRef = this.$db.collection('sensor')
    collectionRef.get().then(sensors => {
      sensors.forEach(sensor => {
        this.sensors.push(sensor.data())
      })
    })
  },
  methods: {
    onNewMeteoStation () {
      this.meteoStation = JSON.parse(JSON.stringify(this.meteoStationModel))
      this.openMeteoStationDialog = true
    },
    onNewMeteoStationSensor (meteoStation) {
      this.currentMeteoStation = meteoStation
      this.meteoStationSensor = JSON.parse(
        JSON.stringify(this.meteoStationSensorModel)
      )
      this.meteoStationSensor.UIDMeteoStation = this.currentMeteoStation.UIDMeteoStation
      this.openMeteoStationSensorDialog = true
    },
    onOKMeteoStationDialogClick () {
      if (
        !this.$refs.Name.hasError &&
        !this.$refs.Latitude.hasError &&
        !this.$refs.Longitude.hasError
      ) {
        const collectionRef = this.$db.collection('meteostation')
        if (this.meteoStation.UIDMeteoStation === null) {
          collectionRef
            .add(this.meteoStation)
            .then(doc => {
              const docRef = this.$db.collection('meteostation').doc(doc.id)
              docRef
                .update({ UIDMeteoStation: doc.id })
                .then(response => {
                  this.meteoStation.UIDMeteoStation = doc.id
                  this.$set(this.meteoStation, 'meteoStationSensors', [])
                  this.meteoStations.push(this.meteoStation)
                  this.openMeteoStationDialog = false
                })
                .catch(function (error) {
                  console.error('Error adding document: ', error)
                })
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        } else {
          const docRef = this.$db
            .collection('meteostation')
            .doc(this.meteoStation.UIDMeteoStation)
          docRef
            .set(this.meteoStation)
            .then(response => {
              const meteoStation = this.meteoStations.find(
                meteoStation =>
                  meteoStation.UIDMeteoStation ===
                  this.meteoStation.UIDMeteoStation
              )
              if (meteoStation) {
                for (const attributeName in this.meteoStation) {
                  meteoStation[attributeName] = JSON.parse(
                    JSON.stringify(this.meteoStation[attributeName])
                  )
                }
              }
              this.openMeteoStationDialog = false
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        }
      }
    },
    onOKMeteoStationSensorDialogClick () {
      const collectionRef = this.$db
        .collection('meteostation')
        .doc(this.currentMeteoStation.UIDMeteoStation)
        .collection('meteostationsensor')
      if (this.meteoStationSensor.UIDMeteoStationSensor === null) {
        collectionRef
          .add(this.meteoStationSensor)
          .then(doc => {
            const docRef = collectionRef.doc(doc.id)
            docRef
              .update({ UIDMeteoStationSensor: doc.id })
              .then(response => {
                this.meteoStationSensor.UIDMeteoStationSensor = doc.id

                this.currentMeteoStation.meteoStationSensors.push(
                  this.meteoStationSensor
                )
                this.openMeteoStationSensorDialog = false
              })
              .catch(function (error) {
                console.error('Error adding document: ', error)
              })
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      } else {
        const docRef = this.$db
          .collection('meteostation')
          .doc(this.currentMeteoStation.UIDMeteoStation)
          .collection('meteostationsensor')
          .doc(this.meteoStationSensor.UIDMeteoStationSensor)
        docRef
          .set(this.meteoStationSensor)
          .then(response => {
            const meteoStationSensor = this.currentMeteoStation.meteoStationSensors.find(
              meteoStationSensor =>
                meteoStationSensor.UIDMeteoStationSensor ===
                this.meteoStationSensor.UIDMeteoStationSensor
            )
            if (meteoStationSensor) {
              for (const attributeName in this.meteoStationSensor) {
                meteoStationSensor[attributeName] = JSON.parse(
                  JSON.stringify(this.meteoStationSensor[attributeName])
                )
              }
            }
            this.openMeteoStationSensorDialog = false
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      }
    },
    onCancelMeteoStationDialogClick () {
      this.openMeteoStationDialog = false
    },
    onCancelMeteoStationSensorDialogClick () {
      this.openMeteoStationSensorDialog = false
    },
    onUpdateMeteoStation (meteoStation) {
      this.meteoStation = JSON.parse(JSON.stringify(this.meteoStationModel))
      for (const attributeName in this.meteoStation) {
        this.meteoStation[attributeName] = JSON.parse(
          JSON.stringify(meteoStation[attributeName])
        )
      }
      this.openMeteoStationDialog = true
    },
    onUpdateMeteoStationSensor (meteoStation, meteoStationSensor) {
      this.currentMeteoStation = meteoStation
      this.meteoStationSensor = JSON.parse(
        JSON.stringify(this.meteoStationSensorModel)
      )
      for (const attributeName in this.meteoStationSensor) {
        this.meteoStationSensor[attributeName] = JSON.parse(
          JSON.stringify(meteoStationSensor[attributeName])
        )
      }
      this.openMeteoStationSensorDialog = true
    },
    onDeleteMeteoStation (row) {
      this.$q
        .dialog({
          title: 'Delete',
          message: 'Confirm deletion.',
          ok: true,
          cancel: true
        })
        .onOk(() => {
          const docRef = this.$db
            .collection('meteostation')
            .doc(row.UIDMeteoStation)
          row.meteoStationSensors.forEach(meteoStationSensor => {
            docRef
              .collection('meteostationsensor')
              .doc(meteoStationSensor.UIDMeteoStationSensor)
              .delete()
              .then(() => {
                console.log(
                  'Document in subcollection deleted: ',
                  meteoStationSensor.UIDMeteoStationSensor
                )
              })
              .catch(error => {
                console.error(
                  'Error deleting document insubcollection: ',
                  error
                )
              })
          })
          docRef
            .delete()
            .then(() => {
              const index = this.meteoStations.findIndex(
                meteoStation =>
                  meteoStation.UIDMeteoStation === row.UIDMeteoStation
              )
              if (index >= 0) {
                this.meteoStations.splice(index, 1)
              }
              if (row.urlImage) {
                const storageRef = this.$storage.ref()
                const imageRef = storageRef.child(row.UIDMeteoStation)
                imageRef
                  .delete()
                  .then(() => {})
                  .catch(error => {
                    console.error('Error deleting image: ', error)
                  })
              }
            })
            .catch(error => {
              console.error('Error removing document: ', error)
            })
        })
    },
    onDeleteMeteoStationSensor (meteoStation, row) {
      this.$q
        .dialog({
          title: 'Delete',
          message: 'Confirm deletion.',
          ok: true,
          cancel: true
        })
        .onOk(() => {
          const docRef = this.$db
            .collection('meteostation')
            .doc(meteoStation.UIDMeteoStation)
            .collection('meteostationsensor')
            .doc(row.UIDMeteoStationSensor)
          docRef
            .delete()
            .then(() => {
              const index = meteoStation.meteoStationSensors.findIndex(
                meteoStationSensor =>
                  meteoStationSensor.UIDMeteoStationSensor ===
                  row.UIDMeteoStationSensor
              )
              if (index >= 0) {
                meteoStation.meteoStationSensors.splice(index, 1)
              }
            })
            .catch(error => {
              console.error('Error removing document: ', error)
            })
        })
    },
    onError (errorMessage) {
      this.uploadButton = false
      this.$q.notify({
        message: errorMessage,
        icon: 'warning',
        color: 'negative',
        position: 'bottom',
        timeout: 3000
      })
    },
    uploadCroppedImage (meteoStation) {
      if (!meteoStation.photo.hasImage()) {
        alert('no image to upload')
        return
      }
      meteoStation.photo.generateBlob(
        blob => {
          console.log(blob)
          if (blob) {
            console.log('uploadCroppedImage')
            const storageRef = this.$storage.ref()
            const imageRef = storageRef.child(meteoStation.UIDMeteoStation)
            imageRef
              .put(blob)
              .then(snapshot => {
                snapshot.ref
                  .getDownloadURL()
                  .then(downloadURL => {
                    const docRef = this.$db
                      .collection('meteostation')
                      .doc(meteoStation.UIDMeteoStation)
                    docRef
                      .update({ urlImage: downloadURL })
                      .then(response => {
                        meteoStation.urlImage = downloadURL
                        this.initialImage = null
                        this.uploadButton = false
                      })
                      .catch(function (error) {
                        console.error('Error adding document: ', error)
                      })
                  })
                  .catch(error => {
                    console.error('Get download URL: ', error)
                  })
              })
              .catch(error => {
                console.error('Uploading file: ', error)
              })
          } else {
            this.onError('File type mismatch')
          }
        },
        'image/jpeg',
        0.8
      ) // 80% compressed jpeg file
    },
    removeImage (meteoStation) {
      this.uploadButton = false
      if (meteoStation.urlImage) {
        const storageRef = this.$storage.ref()
        const imageRef = storageRef.child(meteoStation.UIDMeteoStation)
        imageRef
          .delete()
          .then(() => {
            const docRef = this.$db
              .collection('meteostation')
              .doc(meteoStation.UIDMeteoStation)
            docRef
              .update({ urlImage: null })
              .then(response => {
                meteoStation.urlImage = null
              })
              .catch(error => {
                console.error('Error adding document: ', error)
              })
          })
          .catch(error => {
            console.error('Error deleting image: ', error)
          })
      }
    }
  }
}
</script>
