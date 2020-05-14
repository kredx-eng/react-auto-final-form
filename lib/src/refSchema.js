"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var constants_1 = require("data/constants");
var moment_1 = __importDefault(require("moment"));
exports.schema = {
    name: 'Organization',
    fields: {
        tan: {
            type: 'string',
        },
        bse_symbol: {
            type: 'string',
        },
        secondary_phone: {
            type: 'string',
        },
        primary_contact: {
            layoutName: 'edit_Contact',
            type: 'entity',
            entityName: 'Person',
        },
        logo_img_ref: {
            layoutName: 'edit',
            type: 'entity',
            entityName: 'DocumentRef',
            document_type: '',
            component: 'SingleFileUpload',
        },
        regd_address: {
            layoutName: 'edit',
            type: 'entity',
            entityName: 'Address',
        },
        gstn: {
            type: 'string',
        },
        cin: {
            type: 'string',
        },
        pan_number: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        secondary_contact_designation: {
            type: 'string',
        },
        primary_phone: {
            type: 'string',
        },
        secondary_email: {
            type: 'string',
        },
        financialDescription: {
            type: 'string',
        },
        address: {
            layoutName: 'edit',
            type: 'entity',
            entityName: 'Address',
        },
        secondary_contact: {
            layoutName: 'edit',
            type: 'entity',
            entityName: 'Person',
        },
        joining_date: {
            type: 'integer',
            format: 'int64',
        },
        cc_emails: {
            type: 'array',
            layoutName: 'edit',
            arrayType: 'entity',
            entityType: 'PrimitiveEntity',
            component: 'PrimitiveArrayContainer',
        },
        nse_symbol: {
            type: 'string',
        },
        historyWithKredx: {
            type: 'string',
        },
        type: {
            type: 'string',
            enum: [
                'NONE',
                'PROPRIETORSHIP',
                'PARTNERSHIP',
                'LIMITED_LIABILITY',
                'PRIVATE_LIMITED',
                'PUBLIC_LIMITED',
                'TRUST',
                'REGISTERED_SOCIETIES',
                'GOVERNMENT',
                'OTHERS',
            ],
            component: 'SelectInput',
        },
        primary_contact_designation: {
            type: 'string',
        },
        website: {
            type: 'string',
            format: 'uri',
        },
        verification: {
            layoutName: 'edit',
            type: 'entity',
            entityName: 'Verification',
        },
        uuid: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        started_on: {
            type: 'integer',
            format: 'int64',
        },
        doi: {
            type: 'integer',
            format: 'int64',
        },
        industry: {
            type: 'string',
            enum: [
                'NONE',
                'AEROSPACE',
                'AGRICULTURE',
                'AUTO_COMPONENTS',
                'AUTOMOBILES',
                'BANKING_AND_FINANCE',
                'BIO_FUELS',
                'BIOTECHNOLOGY',
                'BUSINESS_PROCESS_OUTSOURCING',
                'CAPITAL_GOODS',
                'CHEMICALS',
                'CIVIL_AVIATION',
                'CLIMATE_CHANGE',
                'COMPETITIVENESS',
                'DEFENCE',
                'DESIGN',
                'DRUGS_AND_PHARMACEUTICALS',
                'ECONOMIC_AFFAIRS_AND_TAXATION',
                'EDUCATION',
                'ENERGY',
                'ENGINEERING',
                'EXPORTS_AND_IMPORTS',
                'EXTERNAL_RELATIONS',
                'FAMILY_BUSINESS',
                'FAST_MOVING_CONSUMER_GOODS',
                'FOOD_PROCESSING',
                'GEMS_AND_JEWELLERY',
                'HEALTHCARE',
                'HOUSING',
                'HUMAN_RESOURCE_DEVELOPMENT',
                'HYDROCARBONS',
                'ICTE_MANUFACTURING',
                'INDUSTRIAL_RELATIONS',
                'INFORMATION_AND_COMMUNICATION_TECHNOLOGY',
                'INFRASTRUCTURE',
                'INNOVATION',
                'INSURANCE',
                'INTELLECTUAL_PROPERTY_RIGHTS',
                'KNOWLEDGE_MANAGEMENT',
                'LEATHER_AND_LEATHER_PRODUCTS',
                'LOGISTICS',
                'MNC',
                'MANUFACTURING',
                'MEDIA',
                'MEDIA_AND_ENTERTAINMENT',
                'MICRO_MEDIUM_AND_SMALL_SCALE_INDUSTRY',
                'OFFICE_AUTOMATION_AND_IMAGING',
                'OIL_AND_GAS',
                'PETROCHEMICALS',
                'PETROLEUM',
                'POWER',
                'PUBLIC_POLICY',
                'REAL_ESTATE',
                'RENEWABLE_ENERGY',
                'RETAIL',
                'SAFETY_AND_SECURITY',
                'SKILLS_DEVELOPMENT',
                'SPORTS',
                'SURFACE_TRANSPORT',
                'TECHNOLOGY',
                'TELECOM_AND_BROADBAND',
                'TOURISM_AND_HOSPITALITY',
                'URBAN_DEVELOPMENT',
                'WATER',
                'WOMEN_EMPOWERMENT',
            ],
            component: 'SelectInput',
        },
    },
    layouts: {
        edit: {
            orientation: 'vertical',
            groups: {
                defaultGroup: {
                    title: '',
                    orientation: 'horizontal',
                    fields: {
                        verification: {
                            name: 'verification',
                            displayName: 'Verification',
                            size: 6,
                            hidden: true,
                        },
                        name: {
                            name: 'name',
                            displayName: 'Name',
                            size: 6,
                            hidden: true,
                        },
                        email: {
                            name: 'email',
                            displayName: 'Email',
                            size: 6,
                            hidden: true,
                        },
                        primary_phone: {
                            name: 'primary_phone',
                            displayName: 'Primary Phone',
                            size: 6,
                            hidden: true,
                        },
                        secondary_phone: {
                            name: 'secondary_phone',
                            displayName: 'Secondary Phone',
                            size: 6,
                            hidden: true,
                        },
                        secondary_email: {
                            name: 'secondary_email',
                            displayName: 'Secondary Email',
                            size: 6,
                            hidden: true,
                        },
                        website: {
                            name: 'website',
                            displayName: 'Website',
                            size: 6,
                            hidden: true,
                        },
                        cin: {
                            name: 'cin',
                            displayName: 'CIN',
                            size: 6,
                            hidden: true,
                        },
                        pan_number: {
                            name: 'pan_number',
                            displayName: 'Pan Number',
                            size: 6,
                            hidden: true,
                        },
                        gstn: {
                            name: 'gstn',
                            displayName: 'GSTIN',
                            size: 6,
                            hidden: true,
                        },
                        tan: {
                            name: 'tan',
                            displayName: 'TAN',
                            size: 6,
                            hidden: true,
                        },
                        doi: {
                            name: 'doi',
                            displayName: 'DOI',
                            size: 6,
                            hidden: true,
                        },
                        type: {
                            name: 'type',
                            displayName: 'Organization Type',
                            size: 6,
                            hidden: true,
                        },
                        industry: {
                            name: 'industry',
                            displayName: 'Industry',
                            size: 6,
                            hidden: true,
                        },
                        cc_emails: {
                            name: 'cc_emails',
                            displayName: 'CC Emails',
                            size: 6,
                            hidden: true,
                        },
                        bse_symbol: {
                            name: 'bse_symbol',
                            displayName: 'BSE Symbol',
                            size: 6,
                            hidden: true,
                        },
                        joining_date: {
                            name: 'joining_date',
                            displayName: 'Joining Date',
                            size: 6,
                            hidden: true,
                        },
                        nse_symbol: {
                            name: 'nse_symbol',
                            displayName: 'NSE Symbol',
                            size: 6,
                            hidden: true,
                        },
                        uuid: {
                            name: 'uuid',
                            displayName: 'UUID',
                            size: 6,
                            hidden: true,
                        },
                        started_on: {
                            name: 'started_on',
                            displayName: 'Started On',
                            size: 6,
                            hidden: true,
                        },
                        primary_contact_designation: {
                            name: 'primary_contact_designation',
                            displayName: 'Primary Contact Designation',
                            size: 6,
                            hidden: true,
                        },
                        description: {
                            name: 'description',
                            displayName: 'Description',
                            size: 6,
                            hidden: true,
                        },
                        financialDescription: {
                            name: 'financialDescription',
                            displayName: 'Financial Description',
                            size: 6,
                            hidden: true,
                        },
                        historyWithKredx: {
                            name: 'historyWithKredx',
                            displayName: 'History with KredX',
                            size: 6,
                            hidden: true,
                        },
                        logo_img_ref: {
                            name: 'logo_img_ref',
                            displayName: 'Logo Image',
                            size: 6,
                            hidden: true,
                        },
                        primary_contact: {
                            name: 'primary_contact',
                            displayName: 'Primary Contact',
                            size: 12,
                            hidden: true,
                        },
                        secondary_contact_designation: {
                            name: 'secondary_contact_designation',
                            displayName: 'Secondary Contact Designation',
                            size: 6,
                            hidden: true,
                        },
                        secondary_contact: {
                            name: 'secondary_contact',
                            displayName: 'Secondary Contact',
                            size: 12,
                            hidden: true,
                        },
                        address: {
                            name: 'address',
                            displayName: 'Current Address',
                            size: 12,
                            hidden: true,
                        },
                        regd_address: {
                            name: 'regd_address',
                            displayName: 'Registered Address',
                            size: 12,
                            hidden: true,
                        },
                    },
                },
                generalDetailsGroup: {
                    title: 'General Details',
                    size: 12,
                    orientation: 'horizontal',
                    fields: {
                        name: {
                            name: 'name',
                            displayName: 'Name *',
                            size: 6,
                            required: true,
                            error: function (model) {
                                var name = model.name;
                                var NAME_EMPTY_ERROR = 'Please enter your full name';
                                if (!name) {
                                    return NAME_EMPTY_ERROR;
                                }
                            },
                        },
                        email: {
                            name: 'email',
                            displayName: function (model, r, g) { return g.company_type == 'VENDOR' ? 'Email *' : 'Email '; },
                            size: 6,
                            required: function (model, r, g) { return g.company_type == 'VENDOR' ? true : false; },
                            error: function (model) {
                                var email = model.email;
                                if (email) {
                                    var EMAIL_INVALID_ERROR = 'Please enter valid email address';
                                    if (email && !(validator_1.default.isEmail(email))) {
                                        return EMAIL_INVALID_ERROR;
                                    }
                                }
                            },
                        },
                        primary_phone: {
                            name: 'primary_phone',
                            displayName: function (model, r, g) { return g.company_type == 'VENDOR' ? 'Primary Phone *' : 'Primary Phone'; },
                            size: 6,
                            required: function (model, r, g) { return g.company_type == 'VENDOR' ? true : false; },
                            error: function (model) {
                                var primary_phone = model.primary_phone;
                                if (primary_phone) {
                                    var MOBILE_INVALID_ERROR = 'Please use a country code starting with +(plus) along with mobile number';
                                    if (!(primary_phone && (primary_phone.length >= 10))) {
                                        return MOBILE_INVALID_ERROR;
                                    }
                                    if (!(primary_phone && primary_phone[0] === '+')) {
                                        return MOBILE_INVALID_ERROR;
                                    }
                                }
                            },
                        },
                        secondary_phone: {
                            name: 'secondary_phone',
                            displayName: 'Secondary Phone',
                            size: 6,
                            error: function (model) {
                                var secondary_phone = model.secondary_phone;
                                if (secondary_phone) {
                                    var MOBILE_INVALID_ERROR = 'Please use a country code starting with +(plus) along with mobile number';
                                    if (!(secondary_phone && (secondary_phone.length >= 10))) {
                                        return MOBILE_INVALID_ERROR;
                                    }
                                    if (!(secondary_phone && secondary_phone[0] === '+')) {
                                        return MOBILE_INVALID_ERROR;
                                    }
                                }
                            },
                        },
                        secondary_email: {
                            name: 'secondary_email',
                            displayName: 'Secondary Email',
                            size: 6,
                            error: function (model) {
                                var email = model.email;
                                if (email) {
                                    var EMAIL_INVALID_ERROR = 'Please enter valid email address';
                                    if (email && !(validator_1.default.isEmail(email))) {
                                        return EMAIL_INVALID_ERROR;
                                    }
                                }
                            },
                            hidden: true,
                        },
                        website: {
                            name: 'website',
                            displayName: 'Website',
                            size: 6,
                        },
                        cin: {
                            name: 'cin',
                            displayName: function (m, r, g) {
                                return g.organization.type == 'LIMITED_LIABILITY' ? 'LLPIN*' : 'CIN*';
                            },
                            size: 6,
                            visible: function (m, r, g) {
                                return g.organization.type == 'LIMITED_LIABILITY' ||
                                    g.organization.type == 'PRIVATE_LIMITED' ||
                                    g.organization.type == 'PUBLIC_LIMITED' ||
                                    g.organization.type == 'GOVERNMENT';
                            },
                            error: function (m, r, g) {
                                return (m.cin && m.cin.length != 21 && (g.organization.type == 'PRIVATE_LIMITED' ||
                                    g.organization.type == 'PUBLIC_LIMITED' || g.organization.type == 'GOVERNMENT')) ||
                                    (m.cin && m.cin.length != 8 && g.organization.type == 'LIMITED_LIABILITY') ?
                                    'Please enter a valid CIN/LLPIN number' : '';
                            },
                        },
                        pan_number: {
                            name: 'pan_number',
                            displayName: 'PAN Number',
                            size: 6,
                            error: function (model, f, global) {
                                var pan_number = model.pan_number;
                                if (pan_number) {
                                    var PAN_REGEX = new RegExp(/^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/);
                                    var PAN_EMPTY_ERROR = 'Please enter PAN number';
                                    var PAN_INVALID_ERROR = 'Invalid PAN number. Valid format is ABCDE1234F';
                                    if (!pan_number) {
                                        return PAN_EMPTY_ERROR;
                                    }
                                    else if (PAN_REGEX.test(pan_number) === false) {
                                        return PAN_INVALID_ERROR;
                                    }
                                }
                            },
                        },
                        gstn: {
                            name: 'gstn',
                            displayName: function (model, r, g) { return g.company_type == 'VENDOR' ? 'GST Number*' : 'GST Number'; },
                            size: 6,
                            required: function (model, r, g) { return g.company_type == 'VENDOR' ? true : false; },
                            error: function (m) {
                                if (m.gstn) {
                                    var gstnRegx = RegExp(/^(\d{2})([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})(\w{3})$/);
                                    if (gstnRegx.test(m.gstn) == false) {
                                        return 'Invalid GST Number. Valid format is 22ABCDE1234F1Z5';
                                    }
                                    else {
                                        return '';
                                    }
                                }
                                else {
                                    return '';
                                }
                            },
                        },
                        tan: {
                            name: 'tan',
                            size: 6,
                            displayName: function (m, r, g) {
                                return g.organization.type == 'LIMITED_LIABILITY' ||
                                    g.organization.type == 'PRIVATE_LIMITED' ||
                                    g.organization.type == 'PUBLIC_LIMITED' ||
                                    g.organization.type == 'GOVERNMENT' ? 'TAN Number*' : 'TAN Number';
                            },
                            error: function (m) {
                                if (m.tan) {
                                    var tanRegx = RegExp(/^([a-zA-Z]{4})(\d{5})([a-zA-Z]{1})$/);
                                    if (tanRegx.test(m.tan) == false) {
                                        return 'Invalid TAN number. Valid format is AAAA99999A';
                                    }
                                    else {
                                        return '';
                                    }
                                }
                                else if (!m.tan && m.type != 'PROPRIETORSHIP') {
                                    return '';
                                }
                                else {
                                    return '';
                                }
                            },
                        },
                        doi: {
                            name: 'doi',
                            type: 'date',
                            format: 'DD/MM/YYYY',
                            component: 'CustomDatePicker',
                            displayName: 'DOI',
                            size: 6,
                            error: function (model) {
                                var doi = model.doi;
                                var DOI_EMPTY_ERROR = 'Please enter a valid date in dd-mm-yyyy format';
                                var DOI_FUTURE_ERROR = 'DOI cannot be future date';
                                if (doi) {
                                    var m = moment_1.default(new Date(doi), constants_1.momentValidators, true);
                                    if (!m.isValid()) {
                                        return DOI_EMPTY_ERROR;
                                    }
                                    else if (m.isAfter(moment_1.default())) {
                                        return DOI_FUTURE_ERROR;
                                    }
                                }
                            }
                        },
                        type: {
                            name: 'type',
                            displayName: 'Organization Type *',
                            size: 6,
                            required: true,
                        },
                        industry: {
                            name: 'industry',
                            displayName: 'Industry *',
                            size: 6,
                            defaultValue: 'NONE',
                            required: true,
                        },
                        cc_emails: {
                            name: 'cc_emails',
                            displayName: 'CC Emails',
                            size: 6,
                        },
                    },
                },
                registeredAddressGroup: {
                    title: 'Registered Address',
                    size: 12,
                    orientation: 'horizontal',
                    fields: {
                        regd_address: {
                            name: 'regd_address',
                            displayName: '',
                            size: 12,
                            layoutName: 'requiredAddress',
                        },
                    },
                },
                currentAddressGroup: {
                    title: 'Current Address',
                    size: 12,
                    orientation: 'horizontal',
                    fields: {
                        address: {
                            name: 'address',
                            displayName: '',
                            size: 12,
                        },
                    },
                },
                descriptionsGroup: {
                    title: 'Descriptions',
                    orientation: 'horizontal',
                    size: 12,
                    fields: {
                        description: {
                            name: 'description',
                            displayName: 'Description *',
                            component: 'TextArea',
                            required: true,
                            size: 6,
                        },
                        financialDescription: {
                            name: 'financialDescription',
                            displayName: 'Financial Description',
                            component: 'TextArea',
                            size: 6,
                        },
                        historyWithKredx: {
                            name: 'historyWithKredx',
                            displayName: 'History with KredX',
                            component: 'TextArea',
                            size: 6,
                        },
                        logo_img_ref: {
                            name: 'logo_img_ref',
                            displayName: 'Logo Image',
                            size: 6,
                        },
                    },
                },
                primaryContactInfoGroup: {
                    title: 'Primary Contact Information',
                    size: 12,
                    orientation: 'horizontal',
                    fields: {
                        primary_contact_designation: {
                            name: 'primary_contact_designation',
                            displayName: 'Primary Contact Designation',
                            size: 6,
                        },
                        primary_contact: {
                            name: 'primary_contact',
                            displayName: 'Primary Contact',
                            size: 12,
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=refSchema.js.map