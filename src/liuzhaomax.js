/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/16 7:59
 * @version     v1.0
 * @filename    liuzhaomax.js
 * @description
 ***************************************************************************/

const table = {
    "Backend: Gin, Gorm, Go-wire, Go-Micro, NodeExpress": {
        "Key Competencies and Skills 1": "SignIn/Up (JWT, RSA, Cookie/Session), RESTful API, Goroutine, Log",
        "Key Competencies and Skills 2": "CRUD, MiddleWare, Security, I/O, OAuth 2, SSO, [ElasticSearch]",
    },
    "Frontend: React, Vue, Axios, Sass, AntD/V, D3, Three, Webpack, iView, pyQT5": {
        "Key Competencies and Skills 1": "SignIn/Up, Router, Flex layout, Mapbox, Data Visualization",
        "Key Competencies and Skills 2": "State Machine, Lazy loading, Event loop control, GUI",
    },
    "Database: MySQL, MongoDB": {
        "Key Competencies and Skills 1": "CRUD, Transaction, Data warehousing",
    },
    "OM: Linux, Docker, Nginx, GCP Load Balancer": {
        "Key Competencies and Skills 1": "CI/CD DevOps, Https, Sharing between containers",
        "Key Competencies and Skills 2": "Reverse proxy, Load balancing",
    },
    "Data Processing: Spark (Python), Kafka, R": {
        "Key Competencies and Skills 1": "Wrangling, Labeling, ML Pipeline",
    },
    "Others: Matlab, TensorFlow": {
        "Key Competencies and Skills 1": "Integral solution algorithm for topological graphs based on Mason formula",
    }
}

const liuzhaomax = () => {
    console.log("%cWelcome!", "font-size:18px;background-color:#338e6c;color:white;font-weight:bold;padding:10px 100px;border-radius:7px;")
    console.log("%cI am LIU Zhao (Max), a full-stack developer (Go, JS, Docker/Git DevOps, ...). \n"
        + "I wish I can work on micro-service and distribution systems. \n"
        + "I am seeking a job. If you are interested in me, please contact me after November."
        , "font-size:14px;color:#333;padding:5px;")
    console.log("%cliuzhaomax@163.com", "background-color:#338e6c;color:white;font-size:14px;padding:5px 70px;border-radius:7px;")
    console.table(table)
}

export default liuzhaomax