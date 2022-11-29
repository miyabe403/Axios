console.log("main.js!!");

const TOKEN = "pk.eyJ1Ijoic2RrZnoxODF0aWdlciIsImEiOiJja3FxNGU0cmcwdWFoMnhxaG5mcDYyaWwzIn0.acxWamqlCUkmAATOIUTlAQ";
const FORECAST ="https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";

const ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const ACCESS_TOKEN = "pk.eyJ1IjoibWl5YWJlNDAzIiwiYSI6ImNsYXVmMDZ6eDA1azYzd28wazJuOWNsZjIifQ.kvIW4169LLNjtq-QV82zRQ";

// 緯度経度データ
const ogakikouen = [35.3618696, 136.616562];

window.onload = (event)=>{
	console.log("onload!!");

	//TODO1: Axiosで取得したトイレのデータを使って、
	//		 Leafletでアイコンを表示すること

	//TODO2: 未提出の課題に取り掛かってOK!


	//Axiosの使い方
	const option = {responseType: "blob"};
	axios.get("./data.json", option).then(res=>{
				//通信が成功した場合
				console.log("通信が成功しました!")
				console.log(res);//ゲットしたデータ
				//JSONオブジェクトに変換
				res.data.text().then(str=>{
				let arr = JSON.parse(str);
				console.table(arr);

				let data = arr.data;
				console.log(arr.data[1].name);//トイレの名前
				console.log(arr.data[1].lat);//緯度
				console.log(arr.data[1].lng);//経度
			});
		}).catch(err=>{
			//通信が失敗した場合
			console.log("通信が失敗したぞ...");
		});	

		//マップを作る
		let map = L.map("mapid").setView(ogakikouen , 16);

		//マップの設定
		L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
		attribution: ATTRIBUTION, // 著作権表記
		accessToken: ACCESS_TOKEN, //アクセストークン
		id: "mapbox/streets-v11", //マップの種類

		}).addTo(map);

		// マーカーを出す
		L.marker(ogakikouen).addTo(map)
		.bindPopup("Hello OpenStreetMap!!").openPopup();
	}		



