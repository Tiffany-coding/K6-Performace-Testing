import http from "k6/http"
import { check, fail } from 'k6';

export const options={
    scenarios:{
        sc_1:{
            executor:'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '10s',
            exec:'testMethod1'
        },
        sc_2:{
            executor: 'per-vu-iterations',
            vus: 2,
            iterations: 5,
            maxDuration: '10s',
            exec:'testMethod2'
        },
        sc_3:{
            executor: 'constant-vus',
            vus: 2,
            duration: '3s',
            exec:'testMethod3'
        },
        sc_4:{
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
              { duration: '5s', target: 2 },
              { duration: '5s', target: 2 },
              { duration: '5s', target: 0 },
            ],
            gracefulRampDown: '0s',
            exec:'testMethod1'
        }
    },
}
export function testMethod1(){
    http.get("https://reqres.in/api/users?page=2")
}
export function testMethod2(){
    const url="https://reqres.in/api/users"
    const reqBody= JSON.stringify({
        "name":"morpheus",
        "job":"leader"
    })
    const params={
        heaers:{'Content-Type':'application/json'}
    }
   http.post(url,reqBody,params)
}
export function testMethod3(){
    const url="https://reqres.in/api/users"
    const reqBody= JSON.stringify({
        "name":"morpheus",
        "job":"leader"
    })
    const params={
        heaers:{'Content-Type':'application/json'}
    }
   http.put(url,reqBody,params)
}
export function testMethod4(){
    const url="https://reqres.in/api/users"
    const reqBody= JSON.stringify({
        "name":"morpheus",
        "job":"leader"
    })
    const params={
        heaers:{'Content-Type':'application/json'}
    }
   http.del(url,reqBody,params)
}


function checkStatusCode(response){
    if((check(response,{
        'response status code check':(res)=>{
            res.status<400
        }
    }))){
       
        fail(`api call ${response.url} failed with response ${response .body}`)
    }
}