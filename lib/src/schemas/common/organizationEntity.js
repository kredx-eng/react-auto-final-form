"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by aman on 10/7/17.
 */
var organizationDetailPreSanctionEntity = {
    // Entity for vendor organization detail(Tab 1)
    name: "organization_info",
    fields: [
        {
            name: "name",
            displayName: "Name of Company*",
            type: "string",
            help: function (m) {
                return m.name ? "" : "Please enter Name of Company";
            }
        },
        {
            name: "type",
            displayName: "Type of Company*",
            type: "string",
            component: "Select",
            options: [
                { value: "PROPRIETORSHIP", text: "PROPRIETORSHIP" },
                { value: "PARTNERSHIP", text: "PARTNERSHIP" },
                { value: "LIMITED_LIABILITY", text: "LIMITED LIABILITY" },
                { value: "PRIVATE_LIMITED", text: "PRIVATE LIMITED" },
                { value: "PUBLIC_LIMITED", text: "PUBLIC LIMITED" },
                { value: "GOVERNMENT", text: "GOVERNMENT" }
            ],
            help: function (m) {
                return m.type ? "" : "Please select Type of Company";
            }
        },
        {
            name: "industry",
            displayName: "Type of Industry*",
            type: "string",
            component: "Select",
            options: [
                { value: "AEROSPACE", text: "AEROSPACE" },
                { value: "AGRICULTURE", text: "AGRICULTURE" },
                { value: "AUTO_COMPONENTS", text: "AUTO COMPONENTS" },
                { value: "AUTOMOBILES", text: "AUTOMOBILES" },
                { value: "BANKING_AND_FINANCE", text: "BANKING AND FINANCE" },
                { value: "BIO_FUELS", text: "BIO FUELS" },
                { value: "BIOTECHNOLOGY", text: "BIOTECHNOLOGY" },
                {
                    value: "BUSINESS_PROCESS_OUTSOURCING",
                    text: "BUSINESS PROCESS OUTSOURCING"
                },
                { value: "CAPITAL_GOODS", text: "CAPITAL GOODS" },
                { value: "CHEMICALS", text: "CHEMICALS" },
                { value: "CIVIL_AVIATION", text: "CIVIL AVIATION" },
                { value: "CLIMATE_CHANGE", text: "CLIMATE CHANGE" },
                { value: "COMPETITIVENESS", text: "COMPETITIVENESS" },
                { value: "DEFENCE", text: "DEFENCE" },
                { value: "DESIGN", text: "DESIGN" },
                {
                    value: "DRUGS_AND_PHARMACEUTICALS",
                    text: "DRUGS AND PHARMACEUTICALS"
                },
                {
                    value: "ECONOMIC_AFFAIRS_AND_TAXATION",
                    text: "ECONOMIC AFFAIRS AND TAXATION"
                },
                { value: "EDUCATION", text: "EDUCATION" },
                { value: "ENERGY", text: "ENERGY" },
                { value: "ENGINEERING", text: "ENGINEERING" },
                { value: "EXPORTS_AND_IMPORTS", text: "EXPORTS AND IMPORTS" },
                { value: "EXTERNAL_RELATIONS", text: "EXTERNAL RELATIONS" },
                { value: "FAMILY_BUSINESS", text: "FAMILY BUSINESS" },
                {
                    value: "FAST_MOVING_CONSUMER_GOODS",
                    text: "FAST MOVING CONSUMER GOODS"
                },
                { value: "FOOD_PROCESSING", text: "FOOD PROCESSING" },
                { value: "GEMS_AND_JEWELLERY", text: "GEMS AND JEWELLERY" },
                { value: "HEALTHCARE", text: "HEALTHCARE" },
                { value: "HOUSING", text: "HOUSING" },
                {
                    value: "HUMAN_RESOURCE_DEVELOPMENT",
                    text: "HUMAN RESOURCE DEVELOPMENT"
                },
                { value: "HYDROCARBONS", text: "HYDROCARBONS" },
                { value: "ICTE_MANUFACTURING", text: "ICTE MANUFACTURING" },
                { value: "INDUSTRIAL_RELATIONS", text: "INDUSTRIAL RELATIONS" },
                {
                    value: "INFORMATION_AND_COMMUNICATION_TECHNOLOGY",
                    text: "INFORMATION AND COMMUNICATION TECHNOLOGY"
                },
                { value: "INFRASTRUCTURE", text: "INFRASTRUCTURE" },
                { value: "INNOVATION", text: "INNOVATION" },
                { value: "INSURANCE", text: "INSURANCE" },
                {
                    value: "INTELLECTUAL_PROPERTY_RIGHTS",
                    text: "INTELLECTUAL PROPERTY RIGHTS"
                },
                { value: "KNOWLEDGE_MANAGEMENT", text: "KNOWLEDGE MANAGEMENT" },
                {
                    value: "LEATHER_AND_LEATHER_PRODUCTS",
                    text: "LEATHER AND LEATHER PRODUCTS"
                },
                { value: "LOGISTICS", text: "LOGISTICS" },
                { value: "MNC", text: "MNC" },
                { value: "MANUFACTURING", text: "MANUFACTURING" },
                { value: "MEDIA", text: "MEDIA" },
                { value: "MEDIA_AND_ENTERTAINMENT", text: "MEDIA AND ENTERTAINMENT" },
                {
                    value: "MICRO_MEDIUM_AND_SMALL_SCALE_INDUSTRY",
                    text: "MICRO MEDIUM AND SMALL SCALE INDUSTRY"
                },
                {
                    value: "OFFICE_AUTOMATION_AND_IMAGING",
                    text: "OFFICE AUTOMATION AND IMAGING"
                },
                { value: "OIL_AND_GAS", text: "OIL AND GAS" },
                { value: "PETROCHEMICALS", text: "PETROCHEMICALS" },
                { value: "PETROLEUM", text: "PETROLEUM" },
                { value: "POWER", text: "POWER" },
                { value: "PUBLIC_POLICY", text: "PUBLIC POLICY" },
                { value: "REAL_ESTATE", text: "REAL ESTATE" },
                { value: "RENEWABLE_ENERGY", text: "RENEWABLE ENERGY" },
                { value: "RETAIL", text: "RETAIL" },
                { value: "SAFETY_AND_SECURITY", text: "SAFETY AND SECURITY" },
                { value: "SKILLS_DEVELOPMENT", text: "SKILLS DEVELOPMENT" },
                { value: "SPORTS", text: "SPORTS" },
                { value: "SURFACE_TRANSPORT", text: "SURFACE TRANSPORT" },
                { value: "TELECOM_AND_BROADBAND", text: "TELECOM AND BROADBAND" },
                { value: "TOURISM_AND_HOSPITALITY", text: "TOURISM AND HOSPITALITY" },
                { value: "URBAN DEVELOPMENT", text: "URBAN_DEVELOPMENT" },
                { value: "WATER", text: "WATER" },
                { value: "WOMEN_EMPOWERMENT", text: "WOMEN EMPOWERMENT" },
                { value: "OTHERS", text: "OTHERS" }
            ],
            help: function (m) {
                return m.type ? "" : "Please enter Type of Industry";
            }
        },
        {
            name: "cin",
            displayName: "CIN/LLPIN*",
            type: "string",
            visible: function (m, r, g) {
                return g.organization_info.type == "LIMITED_LIABILITY" ||
                    g.organization_info.type == "PRIVATE_LIMITED" ||
                    g.organization_info.type == "PUBLIC_LIMITED" ||
                    g.organization_info.type == "GOVERNMENT"
                    ? true
                    : false;
            },
            error: function (m, r, g) {
                return (m.cin &&
                    m.cin.length != 21 &&
                    (g.organization_info.type == "PRIVATE_LIMITED" ||
                        g.organization_info.type == "PUBLIC_LIMITED" ||
                        g.organization_info.type == "GOVERNMENT")) ||
                    (m.cin &&
                        m.cin.length != 8 &&
                        g.organization_info.type == "LIMITED_LIABILITY")
                    ? "Please enter a valid CIN/LLPIN number"
                    : "";
            }
        },
        {
            name: "email",
            displayName: "Contact Email*",
            type: "string",
            error: function (m) { }
        },
        {
            name: "primary_phone",
            displayName: "Landline Number*",
            type: "string",
            min: 0,
            max: 100,
            error: function (m) { }
        },
        {
            name: "secondary_phone",
            displayName: "Alternate Number",
            type: "string",
            min: 0,
            max: 100,
            error: function (m) { }
        },
        {
            name: "regd_address",
            type: "entity",
            entityName: "address",
            displayName: "Registered Address"
        },
        {
            name: "tan",
            displayName: "TAN No ",
            type: "string",
            visible: function (m) {
                if (m.type != "PROPRIETORSHIP") {
                    return true;
                }
                else {
                    return false;
                }
            },
            error: function (m) {
                if (m.tan && m.type != "PROPRIETORSHIP") {
                    var tanRegx = RegExp(/^([a-zA-Z]{4})(\d{5})([a-zA-Z]{1})$/);
                    if (tanRegx.test(m.tan) == false) {
                        return "Invalid TAN number. Valid format is AAAA99999A";
                    }
                    else {
                        return "";
                    }
                }
                else if (!m.tan && m.type != "PROPRIETORSHIP") {
                    return "";
                }
                else {
                    return "";
                }
            }
        },
        {
            name: "gstn",
            displayName: "Provisional GST lD No",
            type: "string",
            parentClassname: "d-flex col",
            error: function (m) {
                if (m.gstn) {
                    var gstnRegx = RegExp(/^(\d{2})([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})(\w{3})$/);
                    if (gstnRegx.test(m.gstn) == false) {
                        return "Invalid GST lD number. Valid format is 22ABCDE1234F1Z5";
                    }
                    else {
                        return "";
                    }
                }
                else {
                    return ""; //'GSTN Number is required';
                }
            }
        },
        {
            name: "pan_number",
            displayName: "Pan No. of Company*",
            type: "string",
            visible: false
        },
        {
            name: "doi",
            displayName: "D.O.I of Company*",
            type: "string",
            visible: false
        }
    ],
    layouts: [
        {
            name: "edit",
            orientation: "vertical",
            groups: [
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "name",
                            size: 6
                        },
                        {
                            name: "type",
                            size: 6
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "email",
                            size: 6
                        },
                        {
                            name: "industry",
                            size: 6
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "primary_phone",
                            size: 6
                        },
                        {
                            name: "secondary_phone",
                            size: 6
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "cin",
                            size: 6
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "regd_address",
                            layoutName: "edit",
                            size: 12
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "tan",
                            size: 6
                        },
                        {
                            name: "gstn",
                            size: 6,
                            visible: true
                        }
                    ]
                },
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "pan_number",
                            size: 6
                        },
                        {
                            name: "doi",
                            size: 6
                        }
                    ]
                }
            ]
        }
    ]
};
exports.organizationDetailPreSanctionEntity = organizationDetailPreSanctionEntity;
var organizationDetailPostSanctionEntity = {
    // Entity for vendor organization detail(Tab 1)
    name: "organization_info",
    fields: [
        {
            name: "type",
            displayName: "Type Of Company*",
            type: "string",
            component: "Select",
            options: [
                { value: "PROPRIETORSHIP", text: "PROPRIETORSHIP" },
                { value: "PARTNERSHIP", text: "PARTNERSHIP" },
                { value: "LIMITED_LIABILITY", text: "LIMITED_LIABILITY" },
                { value: "PRIVATE_LIMITED", text: "PRIVATE_LIMITED" },
                { value: "PUBLIC_LIMITED", text: "PUBLIC_LIMITED" },
                { value: "TRUST", text: "TRUST" },
                { value: "REGISTERED_SOCIETIES", text: "REGISTERED_SOCIETIES" },
                { value: "GOVERNMENT", text: "GOVERNMENT" }
            ],
            help: function (m) {
                return m.type ? "" : "Please select Type of Company";
            },
            visible: false
        },
        {
            name: "tan",
            displayName: "TAN No*",
            type: "string",
            error: function (m) {
                if (m.tan && m.type != "WPROPRIETORSHIP") {
                    var tanRegx = RegExp(/^([a-zA-Z]{4})(\d{5})([a-zA-Z]{1})$/);
                    if (tanRegx.test(m.tan) == false) {
                        return "Invalid TAN number. Valid format is AAAA99999A";
                    }
                    else {
                        return "";
                    }
                }
                else if (!m.tan && m.type != "WPROPRIETORSHIP") {
                    return "TAN Number is required";
                }
                else {
                    return "";
                }
            }
        },
        {
            name: "gstn",
            displayName: "Provisional GST lD No",
            type: "string",
            error: function (m) {
                if (m.gstn) {
                    var gstnRegx = RegExp(/^(\d{2})([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})(\w{3})$/);
                    if (gstnRegx.test(m.gstn) == false) {
                        return "Invalid GST lD number. Valid format is 22ABCDE1234F1Z5";
                    }
                    else {
                        return "";
                    }
                }
                else {
                    return "GSTN Number is required";
                }
            }
        }
    ],
    layouts: [
        {
            name: "edit",
            orientation: "horizontal",
            groups: [
                {
                    orientation: "horizontal",
                    fields: [
                        {
                            name: "type",
                            size: 12,
                            visible: false
                        },
                        {
                            name: "tan",
                            size: 6,
                            visible: true
                        },
                        {
                            name: "gstn",
                            size: 6,
                            visible: true
                        }
                    ]
                }
            ]
        }
    ]
};
exports.organizationDetailPostSanctionEntity = organizationDetailPostSanctionEntity;
//# sourceMappingURL=organizationEntity.js.map