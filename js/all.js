// 讀入JSON資料
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);

xhr.onload = function(){
  if(xhr.status == 200){
    var data = JSON.parse(xhr.responseText);
    var datalist = data.result.records;
    var dataLen = datalist.length;

    var selectDiv = document.querySelector('.district');
    var districtName = document.querySelector('.district-name');
    var resultList = document.querySelector('.list');

    //---行政區資料---
    var districtList = [];
    var districtLen = districtList.length;
    var selectList = '<option value="0"> - - 選擇行政區 - - </option>';

    for(var i = 0; i<dataLen; i++){
        var result = districtList.indexOf(datalist[i].Zone);
        if(result == -1){
          districtList.push(datalist[i].Zone);
          selectList += '<option value="'+ datalist[i].Zone +'">'+ datalist[i].Zone +'</option>';
        }
    }
    selectDiv.innerHTML = selectList;


    //---選擇行政區---
    selectDiv.addEventListener('change',showList);


    function showList(){
      var choose = selectDiv.value;
      var str = '';
      for(var i = 0; i<dataLen; i++){
        if(datalist[i].Zone == choose){
          var spotName = datalist[i].Name;
          var spotTime = datalist[i].Opentime;
          var spotAdd = datalist[i].Add;
          var spotTel = datalist[i].Tel;
          var spotTicket = datalist[i].Ticketinfo;
          var spotImg = datalist[i].Picture1;
          var spotId = datalist[i].Id;

          str += '<div class="col-12 col-sm-6"><div class="card"><div class="card-img top"><img src="'+ spotImg +'" alt=""></div><div class="card-img-overlay"><span class="name">'+ spotName +'</span><span class="zone">'+ choose +'</span></div><div class="card-body"><div class="content"><img src="img/icons_clock.png" alt=""><span class="opentime"> '+ spotTime +'</span></div><div class="content"><img src="img/icons_pin.png" alt=""><span class="add"> '+ spotAdd +'</span></div><div class="content telDiv"><img src="img/icons_phone.png" alt=""><span class="tel">  '+ spotTel +'</span></div><div class="content ticketDiv"><img src="img/icons_tag.png" alt=""><span class="ticketinfo"> '+ spotTicket +'</span></div><div class="clearfix"></div><button type="button" class="btn btn-light btn-block more" data-toggle="modal" data-target="#myModal" data-id="'+ spotId +'">More...</button></div></div></div>'
        }
      }
      districtName.textContent = choose;
      resultList.innerHTML = str;
    }


    //---熱門按鈕---
    var btngroup = document.querySelector('.btngroup');

    btngroup.addEventListener('click',function(e){
      var hotzone = e.target.dataset.value;

      var str = '';
      for(var i = 0; i<dataLen; i++){
        if(datalist[i].Zone == hotzone){
          var spotName = datalist[i].Name;
          var spotTime = datalist[i].Opentime;
          var spotAdd = datalist[i].Add;
          var spotTel = datalist[i].Tel;
          var spotTicket = datalist[i].Ticketinfo;
          var spotImg = datalist[i].Picture1;
          var spotId = datalist[i].Id;

          if(spotTicket == ''){
            spotTicket ='免費參觀';
          }

          str += '<div class="col-12 col-sm-6"><div class="card"><div class="card-img top"><img src="'+ spotImg +'" alt=""></div><div class="card-img-overlay"><span class="name">'+ spotName +'</span><span class="zone">'+ hotzone +'</span></div><div class="card-body"><div class="content"><img src="img/icons_clock.png" alt=""><span class="opentime"> '+ spotTime +'</span></div><div class="content"><img src="img/icons_pin.png" alt=""><span class="add"> '+ spotAdd +'</span></div><div class="content telDiv"><img src="img/icons_phone.png" alt=""><span class="tel">  '+ spotTel +'</span></div><div class="content ticketDiv"><img src="img/icons_tag.png" alt=""><span class="ticketinfo"> '+ spotTicket +'</span></div><div class="clearfix"></div><button type="button" class="btn btn-light btn-block more"  data-toggle="modal" data-target="#myModal" data-id="'+ spotId +'">More...</button></div></div></div>'
        }
      }
      districtName.textContent = hotzone;
      resultList.innerHTML = str;
    })

    //---Madel---
    resultList.addEventListener('click',madelShow,false);

    function madelShow(e){
      var choose = e.target.nodeName;

      if(choose !== "BUTTON"){return}
      var chooseId = e.target.dataset.id;

      for(var i = 0; i<dataLen; i++){
        if(chooseId == datalist[i].Id){
          var modalbody = document.querySelector('.modal-body');
          var modalTitle = document.querySelector('.modal-title');
          var modalDescription = document.querySelector('.description');
          var modalimg = document.querySelector('.modalImg');
          var spotName = datalist[i].Name;
          var spotZone = datalist[i].Zone;
          var spotTime = datalist[i].Opentime;
          var spotAdd = datalist[i].Add;
          var spotTel = datalist[i].Tel;
          var spotWebsite = datalist[i].Website;
          var spotTicket = datalist[i].Ticketinfo;
          var spotImg = datalist[i].Picture1;
          var spotDescription = datalist[i].Description;
          var spotRemark = datalist[i].Remarks;
          var spotLat = datalist[i].Py;
          var spotLng = datalist[i].Px;

          var spotWebsite_has = '';

          if(spotTicket == ''){
            spotTicket ='免費參觀';
          }

          if(spotWebsite == ''){
            spotWebsite_has = '';
          }else{
            spotWebsite_has = '<div class="content col-12 col-md-6"><img src="img/icons_website.png" alt=""><span class="website"> <a target="_blank" href='+ spotWebsite +'> 官方網站</a></span></span></div>';
          }

          var str = '<div class="modalImg"><img src="'+ spotImg +'" alt=""></div><div class="modalInfo row justify-content-center"><div class="description col-12">'+ spotDescription +'</div><div class="col-12 row"><div class="content col-12 col-md-6"><img src="img/icons_clock.png" alt=""><span class="opentime"> '+ spotTime +'</span></div><div class="content col-12 col-md-6"><img src="img/icons_phone.png" alt=""><span class="tel"> '+ spotTel +'</span></div><div class="content col-12 col-md-6"><img src="img/icons_tag.png" alt=""><span class="ticketinfo"> '+ spotTicket +'</span></div>'+ spotWebsite_has +'<div class="content col-12 col-md-6"><img src="img/icons_pin.png" alt=""><span class="add"> '+ spotAdd +'</span></div><div class="content col-12 col-md-6"><img src="img/icons_remark.png" alt=""><span class="remark"> '+ spotRemark +'</div></div><div class="map col-12" id="'+ chooseId +'"></div></div></div>';

          modalTitle.innerHTML = spotName + '('+ spotZone +')';
          modalbody.innerHTML = str;
          initMap(spotLat, spotLng, chooseId);
        }
      }
    }


    //---google地圖---
    var map
    function initMap(spotlat,spotlng,spotid){

      var mapLat = Number(spotlat);
      var mapLng = Number(spotlng);

      map = new google.maps.Map(document.getElementById(spotid),{
        zoom: 15,
        center:{ lat:mapLat, lng:mapLng}
      });

      var marker = new google.maps.Marker({
        position: {lat:mapLat, lng:mapLng},
        map:map
      })
    }

    //---gotop---
    var goTop = document.querySelector('#gotop');

    window.addEventListener('scroll', show);

    function show(){
      if(window.scrollY >= 300){
        goTop.classList.add('is-visible');
      }else{
        goTop.classList.remove('is-visible');
      }

      if(window.scrollY >= 700){
        goTop.classList.add('is-fade-out');
      }else{
        goTop.classList.remove('is-fade-out');
      }
    }


    $(function () {
      $("#gotop").click(function () {
         jQuery("html,body").animate({
             scrollTop: 0
         }, 1000);
      });
    });


  }else{
    alert('資料錯誤');
  }
}
