<template>
  <div class="q-pa-md q-gutter-sm">
    <q-img
      src="https://i.imgur.com/4RBHbke.png"
      style="display: block; margin-left: auto; margin-right: auto; width: 125px; height: 125px; margin-bottom: 25px"
    />
    <p>
      <strong>NK Rikard Benčić</strong> je nogometni klub iz Rijeke, osnovan
      1948. godine. Trenutno se natječe u 1. Županijskoj nogometnoj lizi
      Primorsko-goranske županije. Treninzi i domaće utakmice se održavaju na
      Omladinskom stadionu kapaciteta 3000 gledatelja. Od uspjeha se ističe 6.
      mjesto iz sezone 2016./2017. te su među prvima odbili sudjelovanje u
      novoosnovanoj Super Ligi.
    </p>
    <div class="container">
      <div class="left">
        <q-btn label="Kupnja karata" color="black" clickable to="/Karta" />
      </div>
      <div class="center">
        <q-btn
          label="Nadolazeće utakmice"
          color="black"
          clickable
          to="/NadolazeceUtakmice"
        />
      </div>
      <div class="right">
        <q-btn
          label="Prošle utakmice"
          color="black"
          clickable
          to="/ProsleUtakmice"
        />
      </div>
    </div>
    <q-img
      src="https://rijekazasve.eu/assets/images/ostvarenja/nova-ostvarenja/nogometno_src_belveder.jpg"
      style="display: block; margin-left: auto; margin-right: auto; width: 95%; height: 400px"
    />
  </div>
</template>
<style>
p {
  text-align: justify;
  padding-left: 2%;
  padding-right: 2.5%;
}
.container{
    text-align:center;
    margin-bottom: 20px;
}
.left{
    float: left;
    margin-left: 25%;
}
.right{
    float: right;
    margin-right: 25%
}
.center{
    margin:0 auto;
    display:inline-block
}
</style>
