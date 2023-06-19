function onClickedPredict() {
    console.log("Predict button clicked");
    var age1 = document.getElementById("uiAge");
    var trtbps1 = document.getElementById("uiTrtbps");
    var chol1 = document.getElementById("uiChol");
    var thalachh1 = document.getElementById("uiThalachh");
    var oldpeak1 = document.getElementById("uiOldpeak");
    var sex1 = document.getElementById("uiSex");
    var exang1 = document.getElementById("uiExang");
    var ca1 = document.getElementById("uiCaa");
    var chestpain1 = document.getElementById("uiChestPain");
    var slp1 = document.getElementById("uiSLP");
    var prediction = document.getElementById("uiPredict");
    var url = "http://127.0.0.1:5000/predict_heart_attack";
    // var url = "/api/predict_heart_attack";
  
    $.post(url, {
        age: parseFloat(age1.value),
        bp: parseFloat(trtbps1.value),
        chol: parseFloat(chol1.value),
        thalachh: parseFloat(thalachh1.value),
        oldpeak: parseFloat(oldpeak1.value),
        sex: sex1.value,
        exang: exang1.value,
        ca: ca1.value,
        chestpain: chestpain1.value,
        slp: slp1.value
    },function(data, status) {
        console.log(data.Prediction);
        prediction.innerHTML = "<h2>" + data.Prediction.toString() + " .</h2>";
        console.log(status);
    });
  }


function func1() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_chestpain";
    // var url = "/api/get_chestpain";
    $.get(url,function(data, status) {
        console.log("got response for get_chestpain request");
        if(data) {
            var chestpain = data.chestpain;
            var uiChestPain = document.getElementById("uiChestPain");
            $('#uiChestPain').empty();
            for(var i in chestpain) {
                var display_name;
                if (chestpain[i] == 'CP_0') {
                    display_name = "TYPICAL ANGINA";
                }
                else if (chestpain[i] == 'CP_1') {
                    display_name = "ATYPICAL ANGINA";
                }
                else if (chestpain[i] == 'CP_2') {
                    display_name = "NON ANGINAL";
                }
                else if (chestpain[i] == 'CP_3') {
                    display_name = "ASYMPTOMATIC ANGINA";
                }
                var opt = new Option(display_name, chestpain[i]);
                $('#uiChestPain').append(opt);
            }
        }
    });
}


function func2() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_slp";
    // var url = "/api/get_slp";
    $.get(url,function(data, status) {
        console.log("got response for get_slp request");
        if(data) {
            var slp = data.slp;
            var uiSLP = document.getElementById("uiSLP");
            $('#uiSLP').empty();
            for(var i in slp) {
                var display_name;
                if (slp[i] == 'SLP_0') {
                    display_name = "ELEVATION IN SLOPE";
                }
                else if (slp[i] == 'SLP_1') {
                    display_name = "FLAT / PARALLEL / CONSTANT SLOPE";
                }
                else if (slp[i] == 'SLP_2') {
                    display_name = "DEPRESSION IN SLOPE";
                }
                var opt = new Option(display_name, slp[i]);
                $('#uiSLP').append(opt);
            }
        }
    });
}


function func3() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_gender";
    // var url = "/api/get_gender";
    $.get(url,function(data, status) {
        console.log("got response for get_gender request");
        if(data) {
            var sex = data.sex;
            var uiSex = document.getElementById("uiSex");
            $('#uiSex').empty();
            for(var i in sex) {
                var display_name;
                if (sex[i] == 'SEX_0') {
                    display_name = "MALE";
                }
                else if (sex[i] == 'SEX_1') {
                    display_name = "FEMALE";
                }
                var opt = new Option(display_name, sex[i]);
                $('#uiSex').append(opt);
            }
        }
    });
}


function func4() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_exang";
    // var url = "/api/get_exang";
    $.get(url,function(data, status) {
        console.log("got response for get_exang request");
        if(data) {
            var exang = data.exang;
            var uiExang = document.getElementById("uiExang");
            $('#uiExang').empty();
            for(var i in exang) {
                var display_name;
                if (exang[i] == 'EXNG_0') {
                    display_name = "NO";
                }
                else if (exang[i] == 'EXNG_1') {
                    display_name = "YES";
                }
                var opt = new Option(display_name, exang[i]);
                $('#uiExang').append(opt);
            }
        }
    });
}


function func5() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_ca";
    // var url = "/api/get_ca";
    $.get(url,function(data, status) {
        console.log("got response for get_ca request");
        if(data) {
            var ca = data.ca;
            var uiCaa = document.getElementById("uiCaa");
            $('#uiCaa').empty();
            for(var i in ca) {
                var display_name;
                if (ca[i] == 'CAA_0') {
                    display_name = "0 VESSELS";
                }
                else if (ca[i] == 'CAA_1') {
                    display_name = "1 VESSEL";
                }
                else if (ca[i] == 'CAA_2') {
                    display_name = "2 VESSELS";
                }
                else if (ca[i] == 'CAA_3') {
                    display_name = "3 VESSELS";
                }
                else if (ca[i] == 'CAA_4') {
                    display_name = "4 VESSELS";
                }
                var opt = new Option(display_name, ca[i]);
                $('#uiCaa').append(opt);
            }
        }
    });
}


function start() {
    func3();
    func4();
    func5();
    func1();
    func2();
}
  
window.onload = start;
