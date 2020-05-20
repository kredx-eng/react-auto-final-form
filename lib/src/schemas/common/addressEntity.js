"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phonesEntity = exports.addressEntity = void 0;
/**
 * Created by aman on 10/7/17.
 */
exports.addressEntity = {
    // Entity for vendor organization address
    name: "address",
    fields: [
        {
            name: "street_address",
            displayName: "Street Address *",
            type: "string"
        },
        {
            name: "city",
            displayName: "City*",
            type: "string",
            error: function (m) {
                // Adding this validation to prevent empty city if address is present, it will give error while generating cibil if city is not present.
                return m.street_address && !m.city ? "Please add City" : "";
            }
        },
        {
            name: "state",
            displayName: "State*",
            type: "string",
            component: "Select",
            options: [
                { value: "ANDAMAN_NICOBAR_ISLANDS", text: "Andaman & Nicobar Islands" },
                { value: "ANDHRA_PRADESH", text: "Andhra Pradesh" },
                { value: "ARUNACHAL_PRADESH", text: "Arunachal Pradesh" },
                { value: "ASSAM", text: "Assam" },
                { value: "BIHAR", text: "Bihar" },
                { value: "CHANDIGARH", text: "Chandigarh" },
                { value: "CHHATTISGARH", text: "Chhattisgarh" },
                { value: "DADRA_NAGAR_HAVELI", text: "Dadra & Nagar Haveli" },
                { value: "DAMAN_DIU", text: "Daman & Diu" },
                { value: "DELHI", text: "Delhi" },
                { value: "GOA", text: "Goa" },
                { value: "GUJARAT", text: "Gujarat" },
                { value: "HARYANA", text: "Haryana" },
                { value: "HIMACHAL_PRADESH", text: "Himachal Pradesh" },
                { value: "JAMMU_KASHMIR", text: "Jammu & Kashmir" },
                { value: "JHARKHAND", text: "Jharkhand" },
                { value: "KARNATAKA", text: "Karnataka" },
                { value: "KERALA", text: "Kerala" },
                { value: "LAKSHADWEEP", text: "Lakshadweep" },
                { value: "MADHYA_PRADESH", text: "Madhya Pradesh" },
                { value: "MAHARASHTRA", text: "Maharashtra" },
                { value: "MANIPUR", text: "Manipur" },
                { value: "MEGHALAYA", text: "Meghalaya" },
                { value: "MIZORAM", text: "Mizoram" },
                { value: "NAGALAND", text: "Nagaland" },
                { value: "ORISSA", text: "Orissa" },
                { value: "PONDICHERRY", text: "Pondicherry" },
                { value: "PUNJAB", text: "Punjab" },
                { value: "RAJASTHAN", text: "Rajasthan" },
                { value: "SIKKIM", text: "Sikkim" },
                { value: "TAMIL_NADU", text: "Tamil Nadu" },
                { value: "TELANGANA", text: "Telangana" },
                { value: "TRIPURA", text: "Tripura" },
                { value: "UTTARANCHAL", text: "Uttaranchal" },
                { value: "UTTAR_PRADESH", text: "Uttar Pradesh" },
                { value: "WEST_BENGAL", text: "West Bengal" },
                { value: "OUT_SIDE_INDIA", text: "Outside India" }
            ]
        },
        {
            name: "pincode",
            displayName: "Pincode*",
            type: "string",
            min: 0,
            max: 100,
            error: function (m) {
                return m.pincode
                    ? m.pincode.length == 6
                        ? ""
                        : "Please provide a valid Pincode."
                    : "";
            }
        },
        {
            name: "phones",
            displayName: "Phone",
            type: "array",
            entityName: "phones",
            className: "bg-dark",
            layoutName: "edit"
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
                            name: "street_address",
                            size: 6
                        },
                        {
                            name: "city",
                            size: 6
                        },
                        {
                            name: "state",
                            size: 6
                        },
                        {
                            name: "pincode",
                            size: 6
                        },
                        {
                            name: "phones",
                            size: 12
                        }
                    ]
                }
            ]
        }
    ]
};
exports.phonesEntity = {
    name: "phones",
    fields: {
        home: { name: "home", type: "string", displayName: "Home" },
        mobile: {
            name: "mobile",
            type: "string",
            displayName: "Mobile"
        }
    },
    layouts: [
        {
            name: "edit",
            orientation: "horizontal",
            fields: [
                { name: "home", size: 6 },
                { name: "mobile", size: 6 }
            ]
        }
    ]
};
//# sourceMappingURL=addressEntity.js.map