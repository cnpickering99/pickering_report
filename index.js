async function getData() {

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-US,en;q=0.8");
    myHeaders.append("authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI4MjM0NmUyZS0wMjJhLTQzYjUtOTIwNS1mODgwODAyM2NmNDAiLCJpc3MiOiJodHRwczovL2NvZGVuaW5qYXN1c2IyYy5iMmNsb2dpbi5jb20vNTYzM2Y2OTgtZGYzNC00MWY1LWE2MjUtM2RhZmQ5ZjgwZTNmL3YyLjAvIiwiZXhwIjoxNzkxNDkxNDAxLCJuYmYiOjE3OTE0ODc4MDEsIm9pZCI6IjdlOTMwZWM4LTE4NWMtNDE4MC05Yzk5LWQ2OWVjYWQ3ZTQxNiIsInN1YiI6IjdlOTMwZWM4LTE4NWMtNDE4MC05Yzk5LWQ2OWVjYWQ3ZTQxNiIsIm5hbWUiOiJTZW5zZWkgU2Vuc2VpIiwiZ2l2ZW5fbmFtZSI6IlNlbnNlaSIsImZhbWlseV9uYW1lIjoiU2Vuc2VpIiwiZXh0ZW5zaW9uX1VzZXJSb2xlIjoiU3RhZmYiLCJ0ZnAiOiJCMkNfMV9TaWduSW4iLCJub25jZSI6Ijg3ZDBlYzYyLWQxODYtNGVmMS1iZjczLTc4OGFjNjQ2ODQ3OSIsInNjcCI6IkFwaS5BY2Nlc3MuRnVsbCIsImF6cCI6IjQ2ZThjZWM4LWEyNWItNGI1MC05MDUzLTQ2OWU5MDZhMzY0ZSIsInZlciI6IjEuMCIsImlhdCI6MTc5MTQ4NzgwMX0.LnumMn9LE224eJIKrNs5jS1Yn1OGSvVH_UmmuiVACz5eBoiiq5VlVCys1GpK1WzzHFJPDuQYgqjdpCFrA-YBeBMwe4rOmXYQ45ec5sVoQEjHNNm3kswVdEw1w0Ln0fc_PZCILrUjSH-4yj4ajc_PUYyHm8IPdlfH9ecShcMWr0xMXikSWLHGDJf4V-FX9oPREmLSbmJpqllaSK1CozBjqfT-A6RdwSaTmPqRFEL9Q3YX9Nl2hOr4wtO9OTeYQqbcl929QWZMZ4O7hSAVIjCJvLJnyCEgCSNDLzXcHcUZbpkHIKhvzRNKezcvltJpqUQKT_tMfSpZJTFhWz7UBsco2w");
    myHeaders.append("cache-control", "no-cache");
    myHeaders.append("facilityid", "43e81fe2-44b4-4806-8aae-b3b843755bd8");
    myHeaders.append("origin", "https://sensei.codeninjas.com");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("priority", "u=1, i");
    myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"154\", \"Brave\";v=\"154\", \"Not A(Brand\";v=\"99\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-site");
    myHeaders.append("sec-gpc", "1");
    myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36");
    myHeaders.append("x-region", "US");
    myHeaders.append("Cookie", "ASLBSA=000391472a5483aa6030097dc67cbf9a5169deb14e3579167358cef561888e81dd97; ASLBSACORS=000391472a5483aa6030097dc67cbf9a5169deb14e3579167358cef561888e81dd97");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&=&displayFilters=All&=&isSensei=true", requestOptions);
        const result = await response.json();
        let theData = result.ninjaInfos.map(ninja => {
            return {
                userName: ninja.userName,
                name: ninja.firstName + " " + ninja.lastName,
                beltName : ninja.currentCouseName,
                beltLevel : ninja.currentCouseSequence
            }
        });
        const csvData = convertToCSV(theData);

        //save to file
        const fs = require('fs');
        fs.writeFileSync('ninjas.csv', csvData);
        //console.log(theData);
    } catch (error) {
        console.error(error);
    };

}

convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = "";

    for (let index in array[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }

    return str;
}


getData();
