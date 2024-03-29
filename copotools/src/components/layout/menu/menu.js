import { useState } from "react";
import { Link } from "react-router-dom";

const unfilteredMenuItems = [
    { name: 'UI', 
    children: [
        { name: "Color picker and converter", url: "tools/ui/colorpicker"},
        { name: "Lorem ipsum generator", url: "tools/ui/loremipsumgenerator"},
        { name: "Image to Base64", url: "tools/ui/imagetobase64"}
    ]},
    { name: 'Formatting', 
    children: [{ name: "Pretty Print JSON", url: "tools/formatting/jsonprettyprinter"},
                { name: "Pretty Print XML", url: "tools/formatting/xmlprettyprinter"},
                { name: "Pretty Print SQL", url: "tools/formatting/sqlprettyprinter"},
                { name: "Pretty Print GraphQL", url: "tools/formatting/gqlprettyprinter"}

    ]},
    { name: 'Encryption / Decryption', 
        children: [
        { name: "Base64", url: "tools/encryption/base64"}
        , { name: "URL", url: "tools/encryption/url"}
        , { name: "JWT Decoder", url: "tools/encryption/jwt"}
        , { name: "Cryptography", children: [
            { name: "MD5 Encoder", url: "tools/encryption/crypto/md5"},
            { name: "SHA-256 Encoder", url: "tools/encryption/crypto/sha256"},
            { name: "SHA-512 Encoder", url: "tools/encryption/crypto/sha512"}
        ]}
    ]},
    { name: 'Conversion', 
        children: [
        { name: "Dec/Bin/Hex/Oct converter", url: "tools/conversion/num"}
    ]},
    { name: 'MISC', 
        children: [
            {name: 'Cron Parser', url: 'tools/misc/cron'}
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
                        {renderMenuItem(items[i])}
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

const renderMenuItem = (item) => 
{
    if (item.hasOwnProperty("url"))
        return <Link 
                to={item.hasOwnProperty("url") ? item.url : "#"}
                className="tree-branch-link">
                    {item.name}
                <button className="tree-branch-button">+</button>
            </Link>

    return <a className="tree-branch-nolink">{item.name}</a>

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