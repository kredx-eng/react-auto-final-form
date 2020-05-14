"use strict";
exports.__esModule = true;
/**
 * Created by aman on 10/7/17.
 */
var bankInfoEntity = {
    // Entity for vendor organization detail(Tab 1)
    name: "bank_info_entity",
    fields: [
        {
            name: "account_name",
            displayName: "Account Name *",
            type: "string"
        },
        {
            name: "account_number",
            displayName: "Account Number *",
            type: "string"
        },
        {
            name: "ifsc_code",
            displayName: "IFSC Code *",
            type: "string",
            error: function (m) {
                var ifscError = "";
                var ifscRegex = new RegExp("^[^\\s]{4}0[^\\s]{6}");
                if (m.ifsc_code && ifscRegex.test(m.ifsc_code) == false) {
                    ifscError = "Please enter a valid IFSC code";
                }
                return ifscError;
            }
        },
        {
            name: "bank",
            displayName: "Bank Name *",
            type: "string"
        }
    ],
    layouts: [
        {
            name: "edit",
            orientation: "vertical",
            size: 12,
            groups: [
                {
                    orientation: "horizontal",
                    size: 12,
                    fields: [
                        {
                            name: "account_name",
                            size: 6
                        },
                        {
                            name: "account_number",
                            size: 6
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    size: 12,
                    fields: [
                        {
                            name: "ifsc_code",
                            size: 6
                        },
                        {
                            name: "bank",
                            size: 6
                        }
                    ]
                }
            ]
        }
    ]
};
exports.bankInfoEntity = bankInfoEntity;
