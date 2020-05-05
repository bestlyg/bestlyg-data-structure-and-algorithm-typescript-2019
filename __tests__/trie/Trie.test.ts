import { Person, getPerson } from "../../src/utils/model";
import Trie from "../../src/core/trie/Trie";
function getNewTrie(): Trie<Person> {
  return new Trie<Person>();
}
describe("Trie", () => {
  test("size", () => {
    const trie = getNewTrie();
    expect(trie.size()).toBe(0);
    trie.add("ad", getPerson(1));
    expect(trie.size()).toBe(1);
  });
  test("isEmpty and clear", () => {
    const trie = getNewTrie();
    expect(trie.isEmpty()).toBeTruthy();
    trie.add("ad", getPerson(1));
    expect(trie.isEmpty()).toBeFalsy();
    trie.clear();
    expect(trie.isEmpty()).toBeTruthy();
  });
  describe("get", () => {
    test("undefined", () => {
      const trie = getNewTrie();
      expect(trie.get("1")).toBeUndefined();
    });
  });
  describe("constains", () => {
    test("true", () => {
      const trie = getNewTrie();
      trie.add("1", getPerson(1));
      expect(trie.contains("1")).toBeTruthy();
    });
    test("false", () => {
      const trie = getNewTrie();
      expect(trie.contains("1")).toBeFalsy();
    });
  });
  describe("startsWith", () => {
    test("true", () => {
      const trie = getNewTrie();
      trie.add("1123", getPerson(1));
      expect(trie.startsWith("11")).toBeTruthy();
    });
    test("false", () => {
      const trie = getNewTrie();
      trie.add("1123", getPerson(1));
      expect(trie.startsWith("113")).toBeFalsy();
    });
  });
  test("keyCheck", () => {
    const trie = getNewTrie();
    try {
      trie.add("", getPerson(1));
    } catch (error) {
      expect(error.toString()).toBe("Error: key must not be empty");
    }
  });
  test("common test", () => {
    const trie = getNewTrie();
    expect(trie.remove("1")).toBeUndefined();
    trie.add("cat", getPerson(1));
    trie.add("dog", getPerson(2));
    trie.add("catalog", getPerson(3));
    trie.add("cast", getPerson(4));
    trie.add("小码哥", getPerson(5));
    trie.add("小码哥", getPerson(8));
    expect(trie.size()).toBe(5);
    expect(trie.startsWith("do")).toBeTruthy();
    expect(trie.startsWith("c")).toBeTruthy();
    expect(trie.startsWith("ca")).toBeTruthy();
    expect(trie.startsWith("cat")).toBeTruthy();
    expect(trie.startsWith("cata")).toBeTruthy();
    expect(!trie.startsWith("hehe")).toBeTruthy();
    expect(trie.get("小码哥")).toBe(getPerson(8));
    expect(trie.remove("cat")).toBe(getPerson(1));
    expect(trie.remove("catalog")).toBe(getPerson(3));
    expect(trie.remove("cast")).toBe(getPerson(4));
    expect(trie.size()).toBe(2);
    expect(trie.startsWith("小")).toBeTruthy();
    expect(trie.startsWith("do")).toBeTruthy();
    expect(!trie.startsWith("c")).toBeTruthy();
  });
});
