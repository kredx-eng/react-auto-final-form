"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefetchDealSchema = void 0;
exports.prefetchDealSchema = {
    entities: [
        {
            name: "prefetchDeal",
            fields: [
                {
                    name: "deal_type",
                    displayName: "Type of Deal*",
                    type: "string",
                    options: [
                        { value: "NONE", text: "NONE" },
                        { value: "INVOICE", text: "INVOICE" },
                        { value: "INVENTORY", text: "INVENTORY" },
                        { value: "PURCHASE_ORDER", text: "PURCHASE_ORDER" },
                        { value: "BOE", text: "BOE" },
                        { value: "LRD", text: "LRD" }
                    ],
                    required: true
                },
                {
                    name: "lob",
                    displayName: "Line of Business*",
                    type: "string",
                    options: [
                        { value: "NONE", text: "NONE" },
                        { value: "NBFC_TYRE_FINANCING", text: "NBFC_TYRE_FINANCING" },
                        { value: "PAYABLES", text: "PAYABLES" },
                        { value: "RECEIVABLES", text: "RECEIVABLES" },
                        { value: "LRD", text: "LRD" }
                    ],
                    required: true
                },
                {
                    name: "paid_to_uid",
                    type: "string"
                },
                {
                    name: "obligation_to_pay_uid",
                    type: "string"
                },
                {
                    name: "recourse_on_uid",
                    type: "string"
                }
            ],
            layouts: [
                {
                    name: "edit",
                    groups: [
                        {
                            orientation: "horizontal",
                            fields: [
                                {
                                    name: "deal_type",
                                    displayName: "Type of Deal *",
                                    defaultValue: "NONE",
                                    required: true,
                                    error: function (model) {
                                        console.log("model2", model);
                                        var deal_type = model.deal_type;
                                        return deal_type == "NONE"
                                            ? "Please select Deal type"
                                            : null;
                                    },
                                    size: 6
                                },
                                {
                                    name: "lob",
                                    displayName: "Line of Business*",
                                    defaultValue: "PAYABLES",
                                    required: true,
                                    error: function (model) {
                                        console.log("model", model);
                                        var lob = model.lob, deal_type = model.deal_type;
                                        if (lob === "NONE") {
                                            return "Please select Line of Business";
                                        }
                                        if ((deal_type === "INVOICE" ||
                                            deal_type === "INVENTORY" ||
                                            deal_type === "PURCHASE_ORDER") &&
                                            lob !== "RECEIVABLES") {
                                            return "Deal type Invoice, Inventory or Purchase Order must have RECEIVABLES as line of business";
                                        }
                                        if (deal_type === "BOE" && lob !== "PAYABLES") {
                                            return "Deal type BOE must have PAYABLES as line of business";
                                        }
                                        if (deal_type === "LRD" && lob !== "LRD") {
                                            return "Deal type LRD should have LRD as line of business";
                                        }
                                        return null;
                                    },
                                    size: 6
                                },
                                {
                                    name: "paid_to_uid",
                                    displayName: "Paid To Company ID *",
                                    extraProps: {
                                        url: "company_index",
                                        createListObject: function (record) { return ({
                                            value: record._id,
                                            label: record._id + " - " + record._source.name
                                        }); },
                                        createLabel: function (record) {
                                            if (record) {
                                                return record.uid + " - " + record.name;
                                            }
                                            return "";
                                        }
                                    },
                                    required: true,
                                    size: 6
                                }
                            ]
                        },
                        {
                            orientation: "horizontal",
                            fields: [
                                {
                                    name: "obligation_to_pay_uid",
                                    displayName: "Obligation ID *",
                                    extraProps: {
                                        url: "company_index",
                                        createListObject: function (record) { return ({
                                            value: record._id,
                                            label: record._id + " - " + record._source.name
                                        }); },
                                        createLabel: function (record) {
                                            if (record) {
                                                return record.uid + " - " + record.name;
                                            }
                                            return "";
                                        }
                                    },
                                    required: true,
                                    size: 6
                                },
                                {
                                    name: "recourse_on_uid",
                                    displayName: "Recourse On *",
                                    required: true,
                                    extraProps: {
                                        url: "company_index",
                                        createListObject: function (record) { return ({
                                            value: record._id,
                                            label: record._id + " - " + record._source.name
                                        }); },
                                        createLabel: function (record) {
                                            if (record) {
                                                return record.uid + " - " + record.name;
                                            }
                                            return "";
                                        }
                                    },
                                    size: 6
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
//# sourceMappingURL=prefetch.js.map