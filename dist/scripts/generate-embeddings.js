"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// File to generate embedding documents for weapons rows
var server_1 = require("../app/utils/supabase/server");
var openai_1 = require("openai");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, openai, _a, weapons, error, _i, _b, weapon, doc, resp, embedding;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, server_1.createClient)()];
                case 1:
                    supabase = _c.sent();
                    openai = new openai_1.default();
                    return [4 /*yield*/, supabase.from('weaponsText').select('*')];
                case 2:
                    _a = _c.sent(), weapons = _a.data, error = _a.error;
                    if (error) {
                        console.error("Error fetching weapons:", error);
                        return [2 /*return*/];
                    }
                    _i = 0, _b = weapons !== null && weapons !== void 0 ? weapons : [];
                    _c.label = 3;
                case 3:
                    if (!(_i < _b.length)) return [3 /*break*/, 7];
                    weapon = _b[_i];
                    doc = "\n            ".concat(weapon.name, " is a ").concat(weapon.category, " that deals ").concat(weapon.attack_text, " damage.\n            It scales with ").concat(weapon.scalesWith_text, " and has a description of ").concat(weapon.description, "\n            ").trim();
                    return [4 /*yield*/, openai.embeddings.create({
                            model: "text-embedding-3-small",
                            input: doc,
                            encoding_format: "float",
                        })];
                case 4:
                    resp = _c.sent();
                    embedding = resp.data[0].embedding;
                    return [4 /*yield*/, supabase
                            .from("weaponsembedding")
                            .upsert({
                            weapon_id: weapon.id, // create new row with weapon ID and embedding vector
                            embedding: embedding,
                        })];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
