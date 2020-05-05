import Person from "./Person";
import Key from "./Key";
import SubKey1 from "./SubKey1";
import SubKey2 from "./SubKey2";
import MyNumber from "./MyNumber";
import MyString from "./MyString";
import MyObject from "./MyObject";
import MyHash from "./MyHash";
import Patient from "./Patient";
enum Model {
  Person,
  Key,
  SubKey1,
  SubKey2,
  MyString,
  MyNumber,
  String,
  MyObject,
  MyHash,
  Patient
}
function getModelFactory(ObjectName: Model): object {
  const obj: object = {};
  return function (val: number): object {
    if (!obj[val]) {
      let newObj;
      switch (ObjectName) {
        case Model.Person:
          newObj = new Person(val.toString(), val);
          break;
        case Model.Key:
          newObj = new Key(val);
          break;
        case Model.SubKey1:
          newObj = new SubKey1(val);
          break;
        case Model.SubKey2:
          newObj = new SubKey2(val);
          break;
        case Model.MyNumber:
          newObj = new MyNumber(val);
          break;
        case Model.MyString:
          newObj = new MyString(val + "");
          break;
        case Model.MyObject:
          newObj = new MyObject(val);
          break;
        case Model.MyHash:
          newObj = new MyHash(val);
          break;
        case Model.Patient:
          newObj = new Patient(val + "", val);
          break;
      }
      obj[val] = newObj;
    }
    return obj[val];
  };
}
const getPerson = getModelFactory(Model.Person) as (num: number) => Person;
const getKey = getModelFactory(Model.Key) as (num: number) => Key;
const getSubKey1 = getModelFactory(Model.SubKey1) as (num: number) => SubKey1;
const getSubKey2 = getModelFactory(Model.SubKey2) as (num: number) => SubKey2;
const getMyNumber = getModelFactory(Model.MyNumber) as (
  num: number
) => MyNumber;
const getMyString = getModelFactory(Model.MyString) as (
  num: number
) => MyString;
const getMyObject = getModelFactory(Model.MyObject) as (
  num: number
) => MyObject;
const getMyHash = getModelFactory(Model.MyHash) as (num: number) => MyHash;
const getPatient = getModelFactory(Model.Patient) as (num: number) => Patient;

export {
  Person,
  getPerson,
  Key,
  getKey,
  SubKey1,
  getSubKey1,
  SubKey2,
  getSubKey2,
  MyNumber,
  getMyNumber,
  MyString,
  getMyString,
  MyObject,
  getMyObject,
  MyHash,
  getMyHash,
  Patient,
  getPatient
};
