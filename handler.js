/**
 * @abstract helper function to deliver the post request
 * @yield {NULL}
 */
async function postData(url='http://127.0.0.1:8080/api/sim', data_json={}, pfunction) {
    console.log("input: " + JSON.stringify(data_json))
    fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Content-Type': "application/json;charset=utf-8"
        },
        //mode: 'no-cors',
        body: JSON.stringify(data_json)
	}).then(resp => resp.json())
		.then(json_output => {pfunction(json_output)}
	);
}

function output(json){
    console.log(JSON.stringify(json));
}

function sendPost(){
    tickers = document.getElementById("tickers").value;
    sectors = document.getElementById("sectors").value;
    hist_context = document.getElementById("hist_context").value;
    sim_start_date = document.getElementById("simulation_start_date").value;
    sim_length = document.getElementById("simulation_length").value;

    let asJson = '{ "tickers" : ["'+tickers+'"],\n"sectors" : ["'+sectors+'"],\n"hist_context" : '+hist_context+',\n"sim_start_date" : "'+sim_start_date+'",\n"sim_length" : '+sim_length+'}';
    postData('http://127.0.0.1:8080/api/sim', JSON.parse(asJson), output)
}

/**
 * @abstract submit the form
 * @yield {boolean} false
 */
function formSubmit() {
	//$("#result").html( "" );
	sendPost();
	return false;
}
