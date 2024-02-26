var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
const password = (pwd) => __awaiter(void 0, void 0, void 0, function* () { return bcrypt.hash(pwd, 10); });
const faker = () => {
    return [
        ["Lendsqr", "HR", "lendsqrhr@gmail.com"],
        ["Smith", "John", "smithjohn@gmail.com"],
        ["Mary", "Parker", "maryparker@gmail.com"],
        ["Peter", "Milla", "petermilla@gmail.com"],
        ["Silva", "Trisha", "silvatrisha@gmail.com"],
    ];
};
export function factory(seeds) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        const offset = 1;
        for (var i = 1; i < (seeds + offset); i++) {
            const payload = {
                id: i,
                firstname: faker()[i - 1][0],
                lastname: faker()[i - 1][1],
                email: faker()[i - 1][2],
                telephone: `0810000000${i}`,
                password: yield password("123456")
            };
            data.push(payload);
        }
        return data;
    });
}
export function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex("users").del();
        yield knex("users").insert(yield factory(5));
    });
}
;
