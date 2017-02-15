import {
    ListLinkedDouble,
    ListItemDouble
} from "../Structures/ListLinkedDouble";

import { XArray } from "../Structures/XArray";
import MArray from "../Structures/MArray";
import Console from "../UI/Console";

//======================================================================
let fruits = new XArray(
    "Cherry", "Apple", "Plum", "Orange", "Lemon",
    "Mango",
    //"Strawberry", "Pear", "Kiwi", "Melone",
);

const MakeItems =
    (arr: Array<string>): Array<ListItemDouble> => MArray.from({length: arr.length},
        (v: void, i: number): ListItemDouble => new ListItemDouble(arr[i])
    );

function listFromArray(arrayOfNames: Array<string>): ListLinkedDouble {
    let list = new ListLinkedDouble();
    let items = MakeItems(arrayOfNames);
    items.forEach((item: ListItemDouble) => { list.tail = item; });
    Console.log("toString: " + list.toString());
    Console.log("should be: " + arrayOfNames.join(", ") + "\n\n");
    return list;
}

function findItemTest(list: ListLinkedDouble, itemName: string) {
    let item = list.find(itemName);
    Console.log("find: " + itemName + " -> "+ item.toString());
    Console.log("should be: " + fruits.find((n: ListItemDouble): boolean => n===itemName) + "\n\n");
}

function removeTest(list: ListLinkedDouble, itemName: string) {
    let item = list.find(itemName);
    Console.log("remove: " + itemName);
    Console.log("from: " + list.toString());
    list.remove(item);
    Console.log("results in: " + list.toString());
    fruits = fruits.without(itemName);
    Console.log("should be: " + fruits.join(", ") + "\n\n");
}

function insertTest(list: ListLinkedDouble, itemName: string) {
    let item = new ListItemDouble(itemName);
    list.insertBefore(item);
    Console.log("insertBefore: " + itemName);
    Console.log("results in: " + list.toString());
    fruits = fruits.insertBefore(itemName);
    Console.log("should be: " + fruits.join(", ") + "\n\n");
}

//======================================================================
let fruitsList = listFromArray(fruits);


findItemTest(fruitsList, "Apple");

removeTest(fruitsList, "Mango");
removeTest(fruitsList, "Cherry");
removeTest(fruitsList, "Orange");
removeTest(fruitsList, "Lemon");

insertTest(fruitsList, "Orange");
insertTest(fruitsList, "Ananas");
insertTest(fruitsList, "Peaches");


//======================================================================
let mArray = new MArray(1,2,3,4,5,6);
Console.log(mArray.tail);

//======================================================================
if (window) Object.assign(window.MICAGE = window.MICAGE || {}, {
    fruits,
    fruitsList,
    mArray
});
