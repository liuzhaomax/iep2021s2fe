/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/25 16:28
 * @version     v1.0
 * @filename    blogContentJson2Html.js
 * @description
 ***************************************************************************/

import React from "react";

const blogContentJson2Html = (json) => {
    return json.map((value, index) => {
        let key = value.blogId + "" + index
        switch (value.type) {
            case "image":
                return <img key={key} src={value.url} alt="blog-article-img" className="blog-article-img"/>
            case "video":
                return <iframe key={key}
                               width="560" height="315" src={value.url}
                               title="YouTube video player" frameBorder="0"
                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                               allowFullScreen
                               className="blog-article-video"
                />
            case "paragraph":
                return <p key={key}>{
                    value.children[0].text
                }</p>
            case "headingOne":
                return <h1 key={key}>{value.children[0].text}</h1>
            case "headingTwo":
                return <h2 key={key}>{value.children[0].text}</h2>
            case "headingThree":
                return <h3 key={key}>{value.children[0].text}</h3>
            case "alignLeft":
                return (
                    <div key={key} style={{alignSelf: "flex-start"}}>
                        {value.children[0].children[0].text}
                    </div>
                )
            case "alignCenter":
                return (
                    <div key={key} style={{alignSelf: "center"}}>
                        {value.children[0].children[0].text}
                    </div>
                )
            case "alignRight":
                return (
                    <div key={key} style={{alignSelf: "flex-end"}}>
                        {value.children[0].children[0].text}
                    </div>
                )
            case "list-item":
                return <li key={key}>{value.children[0].text}</li>
            case "orderedList":
                return <ol type="1" key={key}>{value.children[0].text}</ol>
            case "unorderedList":
                return <ul key={key}>{value.children[0].text}</ul>
            case "link":
                return <a key={key} href={value.url}/>
            case "table":
                return (
                    <table>
                        <tbody key={key}>{value.children[0].text}</tbody>
                    </table>
                )
            case "table-row":
                return <tr key={key}>{value.children[0].text}</tr>
            case "table-cell":
                return <td key={key}>{value.children[0].text}</td>
            default:
                return <p key={key}>{value.children[0].text}</p>
        }
    })
}

export default blogContentJson2Html