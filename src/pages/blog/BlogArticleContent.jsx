/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/25 20:24
 * @version     v1.0
 * @filename    BlogArticleContent.jsx
 * @description
 ***************************************************************************/

import React, { useState, useMemo, useCallback } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { sizeMap, fontFamilyMap } from "./SlateUtilityFunctions"
import "./BlogArticle.css"

const Element = (props) =>{

    const {attributes, children, element} = props;

    switch(element.type){
        case "headingOne":
            return <h1 {...attributes}>{children}</h1>
        case "headingTwo":
            return <h2 {...attributes}>{children}</h2>
        case "headingThree":
            return <h3 {...attributes}>{children}</h3>
        // case "blockquote":
        //     return <blockquote {...attributes}>{children}</blockquote>
        case "alignLeft":
            return <div style={{textAlign:"left",listStylePosition:"inside"}} {...attributes}>{children}</div>
        case "alignCenter":
            return <div style={{textAlign:"center",listStylePosition:"inside"}} {...attributes}>{children}</div>
        case "alignRight":
            return <div style={{textAlign:"right",listStylePosition:"inside"}} {...attributes}>{children}</div>
        case "list-item":
            return  <li {...attributes}>{children}</li>
        case "orderedList":
            return <ol type="1" {...attributes}>{children}</ol>
        case "unorderedList":
            return <ul {...attributes}>{children}</ul>
        // case "link":
        //     return <a {...props}/>

        case "table":
            return <table>
                <tbody {...attributes}>{children}</tbody>
            </table>
        case "table-row":
            return <tr {...attributes}>{children}</tr>
        case "table-cell":
            return <td {...attributes}>{children}</td>
        case "image":
            return <img src={element.url} alt="blog-article-img" className="blog-article-img"/>
        case "video":
            return <iframe width="560" height="315" src={element.url}
                           title="YouTube video player" frameBorder="0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                           className="blog-article-video"
            />
        default :
            return <p {...attributes}>{children}</p>
    }
}
const Leaf = ({ attributes, children, leaf }) => {

    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if(leaf.strikethrough){
        children = <span style={{textDecoration:"line-through"}}>{children}</span>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    if(leaf.superscript){
        children = <sup>{children}</sup>
    }
    if(leaf.subscript){
        children = <sub>{children}</sub>
    }
    if(leaf.color){
        children = <span style={{color:leaf.color}}>{children}</span>
    }
    if(leaf.bgColor){
        children = <span style={{backgroundColor:leaf.bgColor}}>{children}</span>
    }
    if(leaf.fontSize){
        const size = sizeMap[leaf.fontSize]
        children = <span style={{fontSize:size}}>{children}</span>
    }
    if(leaf.fontFamily){
        const family = fontFamilyMap[leaf.fontFamily]
        children = <span style={{fontFamily:family}}>{children}</span>
    }
    return <span {...attributes}>{children}</span>
}

const BlogArticleContent = (props) => {
    const [value, setValue] = useState(props.content)
    const editor = useMemo(() => withReact(createEditor()), [])

    const renderElement = useCallback(props => <Element {...props}/>,[])
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Editable readOnly
                      style={{width:"100%"}}
                      placeholder="Loading..."
                      renderElement={renderElement}
                      renderLeaf={renderLeaf}
                      className="blog-article-content-skin"
            />
        </Slate>
    )
}

export default BlogArticleContent