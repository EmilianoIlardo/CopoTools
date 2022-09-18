import { useState } from "react";
import { Link } from "react-router-dom";

const unfilteredMenuItems = [
    { name: 'UI', 
    children: [
        { name: "Color picker and converter", url: "tools/ui/colorpicker"}
    ]},
    { name: 'Formatting', 
    children: [
        {   name: "JSON", 
            children: [
                { name: "Pretty Print JSON", url: "tools/formatting/jsonprettyprinter"}
            ]},
        { name: "XML", 
            children: [
                { name: "Pretty Print XML", url: "tools/formatting/xmlprettyprinter"}
        ],} 
    ]},
    { name: 'Encryption / Decryption', 
        children: [
        { name: "Base64", url: "tools/formatting/jsonprettyprinter"}
        , { name: "URL", url: "tools/formatting/jsonprettyprinter"}
    ]},
    { name: 'API', url: 'asdasd' },
    { name: 'MISC', 
        children: [
            {name: 'Cron Parser', url: 'asdasd'}
        ] },
]

const renderMenu = (items, isRecursing = false) =>
{
    let itemsJsx = [];
    for (let i = 0; i < items.length; i++)
    {
        itemsJsx.push
            (
                <li key={i + items[i].name} className="tree-branch">
                    <div className="tree-branch-action">
                    <Link 
                        to={items[i].hasOwnProperty("url") ? items[i].url : "#"}
                        className="tree-branch-link">
                            {items[i].name}
                        <button className="tree-branch-button">+</button>
                    </Link>
                    </div>
                    {
                        items[i].hasOwnProperty("children") && renderMenu(items[i].children, true)
                    }
                </li>
            )
    }

    return (
    <ul className={"tree" + (isRecursing ? " tree--sub" : "")}>
        {itemsJsx}
    </ul>)
}

function Menu() {
    const [filteredMenuItems, setFilteredMenuItems] = useState(unfilteredMenuItems);

    const onFilterMenuItems = event => {
        const query = event.target.value;
        // if query is empty, return all results
        if (query.trim().length === 0)
        {
            setFilteredMenuItems(unfilteredMenuItems);
            return;
        }

        let unfilteredMenuItemsCopy = JSON.parse(JSON.stringify(unfilteredMenuItems));
        let resultArray = unfilteredMenuItemsCopy.filter(function f(o) {
            return o.name.toLowerCase().includes(query.toLowerCase()) ||
                   o.children && (o.children = o.children.filter(f)).length
          });

        setFilteredMenuItems(resultArray);
    };

    return (	
    <div className="window-panel">
        <h2 className="section-title">
            Find tools
        </h2>
        <div className="search">
            <input 
            type="text" 
            className="search-input"
            placeholder="Filter..."
            onChange={onFilterMenuItems}/>
        </div>
        

            {
                renderMenu(filteredMenuItems)
            }

    </div>);
}

export default Menu;