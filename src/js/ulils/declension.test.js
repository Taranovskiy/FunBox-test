import assert from "assert";
import {declension} from "./declension";

const mockWords = [
    `предмет`,
    `предмета`,
    `предметов`
];

const mockNumbers = [0, 1, 2, 20, 21];
const correctResults = [
    `предметов`,
    `предмет`,
    `предмета`,
    `предметов`,
    `предмет`
];

describe(`Declension words`, () => {
    it(`should be correct words`, () => {
        assert.deepEqual(
            mockNumbers.map((num) => declension(num, mockWords)),
            correctResults
        );
    });
});
