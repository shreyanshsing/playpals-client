"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridSxProps = void 0;
var gridSxProps = function (color) {
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: color,
        boxShadow: 2,
        height: 100,
        width: 100,
        cursor: "pointer",
    };
};
exports.gridSxProps = gridSxProps;
