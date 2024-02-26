var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import messages from "../../../../enums/message.js";
export function factory(seeds) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        const offset = 1;
        for (var i = 1; i < (seeds + offset); i++) {
            const payload = {
                id: i,
                user_id: i,
                message: messages.welcome,
            };
            data.push(payload);
        }
        return data;
    });
}
export function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex("notifications").del();
        yield knex("notifications").insert(yield factory(5));
    });
}
;
