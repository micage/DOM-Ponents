const text1 = "A TreeView and a DataView inside a SplitView:";

const text1a = "Because a TreeView and a DataView does not know eachother\
    they are controlled by a parent component in this case called EditorSVG.\
    EditorSVG creates the TreeView and the DataView as it's children.\
";

const text1b = "\
    The SVG-Image is imported as raw text and set as innerHTML of the DataView.\
    The data for the TreeView is the XML of the SVG-Image converted to JSON, thänx to xml2js.\
    This looks kind of weird in the first place, but compare it with the content of\
    the SVG-file on the bottom. The $-nodes are the attributes of the related SVG-node.\
    And there is also some junk from inkscape (like 'sodopodi', 'desc' and 'defs').\
";
 const text1c = "Next on the road map is to write a tree converter that transforms the cryptic parts \
     of the SVG-data in a more readable and convenient format. Next station will be to synchronize \
     the TreeView with the DataView. So if you click on an item this will show up in both views.\
     Also database access and display of the related data is crucial. Since you can give all your \
     SVG-nodes an id, the look-up is fairly easy.\
 ";

const text1d = "\
     After this it could be time to make the content editable, but maybe not. There are already \
     some SVG-editors out there. And although the idea is very appealing, once I can control the \
     complete SVG-tree to write editor functionality like adding, removing nodes, changing properties \
     and so on, it would consume a lot of time, presumably a couple of months.\
     But wouldn't it be great to have a full-flegded, drag and drop capable SVG-Editor online?\
     SVG-Animations included?\
";
const text2 = "The content of the SVG-File displayed on the right side of the tree:";

const text3 = "The content of ExplorerSVG.js:";

export {
    text1, 
    text1a, 
    text1b, 
    text1c, 
    text1d, 
    text2,
    text3
};