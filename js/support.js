

var picture_url = "";
var count1 = 0;
var count2 = 0;
var array = new array();


function startchat(){
	var box = document.getElementById("support_chat");
	box.style.display = "initial";
	checkready();
}

function checkready() {
	axios.get('http://51.15.59.130:46260/start')
  .then(function (response) {
    //console.log(response.data.success);
    if (response.data.success){
    	getinfo();
    	getmassege();
    }
  })
  .catch(function (error) {
    console.log(error);
  });  
}

function getinfo(){
	axios.get('http://51.15.59.130:46260/support')
  .then(function (response) {
    //console.log(response.data.support);
    var firstname = response.data.support.first;
    var lastname = response.data.support.last;
    picture_url = response.data.support.picture;
    //console.log(document.getElementById("post").innerHTML );
    document.getElementById("post").innerHTML="پشتیبان بخش فروش";
    document.getElementById("name").innerHTML = firstname.valueOf() + " "+ lastname.valueOf();
    var newimg = document.createElement("img");
    newimg.setAttribute('src', picture_url);    
	newimg.setAttribute('height', '90px');
	newimg.setAttribute('width', '60px');
	newimg.style.borderradius ="16px";
	newimg.id = "img";
    document.getElementById("pic_id").appendChild(newimg); 

  })
  .catch(function (error) {
    console.log(error);
  });  
}

function getmassege() {
axios.get('http://51.15.59.130:46260/fetch')
  .then(function (response) {
    //console.log(response.data.responses);
    if (response.data.responses.size==0){
    	return;
    }
    count1 = count1 + 1;
    var newdiv = document.createElement("div");
    newdiv.className  = "item1";
    line = document.createElement("br");
   
    var newspan = document.createElement("span");
    newspan.innerHTML = response.data.responses[0].message;
    newsub = document.createElement("sub");
    newsub.innerHTML = response.data.responses[0].date;
    newspan.appendChild(newsub);
    newspan.style.alligntext ="right";
    newdiv.appendChild(newspan);
    var newimg = document.createElement("img");
    newimg.className  = "img1";
    newimg.style.float = "right";
    newimg.setAttribute('src', picture_url);    
	newimg.setAttribute('height', '40px');
	newimg.setAttribute('width', '40px');
	newdiv.appendChild(newimg);
    document.getElementById("chat").append(newdiv);
    document.getElementById("chat").append(line);
    array[count1] = response.data.responses[0].message;
    
    //console.log(response.data.responses[0].date);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function send(argument) {
	axios.post('http://51.15.59.130:46260/send', {
    message: argument
  })
  .then(function (response) {
    count2 = count2 + 1;
  	document.getElementById('chat_input').value = "";
    var newdiv = document.createElement("div");
    newdiv.className  = "item2";
    var newimg = document.createElement("img");
    newimg.className  = "img2";
    newimg.setAttribute('src', "./pic/mypic.jpg");    
	newimg.setAttribute('height', '40px');
	newimg.setAttribute('width', '40px');
	newimg.style.float = "left";
	newdiv.appendChild(newimg);
    var newspan = document.createElement("span");
    newspan.innerHTML =argument ;
    newsub = document.createElement("sub");
    var d = new Date();
    newsub.innerHTML = d.getFullYear();
    newspan.appendChild(newsub);
    newspan.style.clear = "left";
    newdiv.appendChild(newspan);  
    newdiv.style.display = "block";  
    document.getElementById("chat").append(newdiv);
    line = document.createElement("br");
    document.getElementById("chat").append(line);
  })
  .catch(function (error) {
    console.log(error);
  });
}


 setInterval(getmassege, 3000);



function endchat(argument) {
	document.getElementById("chat_input").value = "";
	var box = document.getElementById("support_chat");
	box.style.display = "none";
	// document.getElementById("pic_id").removeChild(document.getElementById("img"));
	// document.getElementById("post").innerHTML = "";
	// document.getElementById("name").innerHTML = "";
	// picture_url = "";
	// var item1 = document.getElementsByClassName('item1');
	// var item2 = document.getElementsByClassName('item2');
	// var ch = document.getElementById("chat");
	// var i = 0;
	// for (i=0;i<count1;i++){
	// ch.removeChild(item1[i]);
	// }
	// i = 0;
	// for (i=0;i<count2;i++){
	// ch.removeChild(item2[i]);
	// }
}