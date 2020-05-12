import React from "react";
import { Schema } from "../FormBuilder/interfaces/SchemaInterfaces";

export const createCompanySchema: any = {
  entities: [
    {
      name: "createCompany",
      fields: [
        {
          name: "name",
          displayName: "Organisation Name*",
          placeholder: "Organisation Name*",
          type: "string",
          required: true
        },
        {
          name: "type",
          displayName: "Type of Organisation*",
          type: "string",
          component: "Select",
          options: [
            { value: "NONE", text: "NONE" },
            { value: "PROPRIETORSHIP", text: "PROPRIETORSHIP" },
            { value: "PARTNERSHIP", text: "PARTNERSHIP" },
            { value: "LIMITED_LIABILITY", text: "LIMITED LIABILITY" },
            { value: "PRIVATE_LIMITED", text: "PRIVATE LIMITED" },
            { value: "PUBLIC_LIMITED", text: "PUBLIC LIMITED" },
            { value: "TRUST", text: "TRUST" },
            { value: "REGISTERED_SOCIETIES", text: "REGISTERED SOCIETIES" },
            { value: "GOVERNMENT", text: "GOVERNMENT" },
            { value: "FOREIGN_COMPANY", text: "FOREIGN COMPANY" }
          ],
          required: true
        },
        {
          name: "company_type",
          displayName: "Company Type*",
          component: "Select",
          type: "string",
          options: [
            { value: "", text: "NONE" },
            { value: "VENDOR", text: "VENDOR" },
            { value: "ENTERPRISE", text: "ENTERPRISE" },
            { value: "BOE_VENDOR", text: "BOE VENDOR" }
          ],
          required: true,
          size: 6
        },
        {
          name: "industry",
          displayName: "Type of Industry*",
          type: "string",
          component: "Select",
          options: [
            { label: "NONE", text: "NONE" },
            { label: "AEROSPACE", text: "AEROSPACE" },
            { label: "AGRICULTURE", text: "AGRICULTURE" },
            { label: "AUTO COMPONENTS", text: "AUTO_COMPONENTS" },
            { label: "AUTOMOBILES", text: "AUTOMOBILES" },
            { label: "BANKING AND FINANCE", text: "BANKING_AND_FINANCE" },
            { label: "BIO FUELS", text: "BIO_FUELS" },
            { label: "BIOTECHNOLOGY", text: "BIOTECHNOLOGY" },
            {
              label: "BUSINESS PROCESS OUTSOURCING",
              text: "BUSINESS_PROCESS_OUTSOURCING"
            },
            { label: "CAPITAL GOODS", text: "CAPITAL_GOODS" },
            { label: "CHEMICALS", text: "CHEMICALS" },
            { label: "CIVIL AVIATION", text: "CIVIL_AVIATION" },
            { label: "CLIMATE CHANGE", text: "CLIMATE_CHANGE" },
            { label: "COMPETITIVENESS", text: "COMPETITIVENESS" },
            { label: "DEFENCE", text: "DEFENCE" },
            { label: "DESIGN", text: "DESIGN" },
            {
              label: "DRUGS AND PHARMACEUTICALS",
              text: "DRUGS_AND_PHARMACEUTICALS"
            },
            {
              label: "ECONOMIC AFFAIRS AND TAXATION",
              text: "ECONOMIC_AFFAIRS_AND_TAXATION"
            },
            { label: "EDUCATION", text: "EDUCATION" },
            { label: "ENERGY", text: "ENERGY" },
            { label: "ENGINEERING", text: "ENGINEERING" },
            { label: "EXPORTS AND IMPORTS", text: "EXPORTS_AND_IMPORTS" },
            { label: "EXTERNAL RELATIONS", text: "EXTERNAL_RELATIONS" },
            { label: "FAMILY BUSINESS", text: "FAMILY_BUSINESS" },
            {
              label: "FAST MOVING CONSUMER_GOODS",
              text: "FAST_MOVING_CONSUMER_GOODS"
            },
            { label: "FOOD PROCESSING", text: "FOOD_PROCESSING" },
            { label: "GEMS AND JEWELLERY", text: "GEMS_AND_JEWELLERY" },
            { label: "HEALTHCARE", text: "HEALTHCARE" },
            { label: "HOUSING", text: "HOUSING" },
            {
              label: "HUMAN RESOURCE DEVELOPMENT",
              text: "HUMAN_RESOURCE_DEVELOPMENT"
            },
            { label: "HYDROCARBONS", text: "HYDROCARBONS" },
            { label: "ICTE MANUFACTURING", text: "ICTE_MANUFACTURING" },
            { label: "INDUSTRIAL RELATIONS", text: "INDUSTRIAL_RELATIONS" },
            {
              label: "INFORMATION AND COMMUNICATION TECHNOLOGY",
              text: "INFORMATION_AND_COMMUNICATION_TECHNOLOGY"
            },
            { label: "INFRASTRUCTURE", text: "INFRASTRUCTURE" },
            { label: "INNOVATION", text: "INNOVATION" },
            { label: "INSURANCE", text: "INSURANCE" },
            {
              label: "INTELLECTUAL PROPERTY RIGHTS",
              text: "INTELLECTUAL_PROPERTY_RIGHTS"
            },
            { label: "KNOWLEDGE MANAGEMENT", text: "KNOWLEDGE_MANAGEMENT" },
            {
              label: "LEATHER AND LEATHER PRODUCTS",
              text: "LEATHER_AND_LEATHER_PRODUCTS"
            },
            { label: "LOGISTICS", text: "LOGISTICS" },
            { label: "MNC", text: "MNC" },
            { label: "MANUFACTURING", text: "MANUFACTURING" },
            { label: "MEDIA", text: "MEDIA" },
            {
              label: "MEDIA AND ENTERTAINMENT",
              text: "MEDIA_AND_ENTERTAINMENT"
            },
            {
              label: "MICRO MEDIUM AND SMALL SCALE INDUSTRY",
              text: "MICRO_MEDIUM_AND_SMALL_SCALE_INDUSTRY"
            },
            {
              label: "OFFICE AUTOMATION AND IMAGING",
              text: "OFFICE_AUTOMATION_AND_IMAGING"
            },
            { label: "OIL AND GAS", text: "OIL_AND_GAS" },
            { label: "PETROCHEMICALS", text: "PETROCHEMICALS" },
            { label: "PETROLEUM", text: "PETROLEUM" },
            { label: "POWER", text: "POWER" },
            { label: "PUBLIC POLICY", text: "PUBLIC_POLICY" },
            { label: "REAL ESTATE", text: "REAL_ESTATE" },
            { label: "RENEWABLE ENERGY", text: "RENEWABLE_ENERGY" },
            { label: "RETAIL", text: "RETAIL" },
            { label: "SAFETY AND SECURITY", text: "SAFETY_AND_SECURITY" },
            { label: "SKILLS DEVELOPMENT", text: "SKILLS_DEVELOPMENT" },
            { label: "SPORTS", text: "SPORTS" },
            { label: "SURFACE TRANSPORT", text: "SURFACE_TRANSPORT" },
            { label: "TECHNOLOGY", text: "TECHNOLOGY" },
            { label: "TELECOM AND BROADBAND", text: "TELECOM_AND_BROADBAND" },
            {
              label: "TOURISM AND HOSPITALITY",
              text: "TOURISM_AND_HOSPITALITY"
            },
            { label: "URBAN DEVELOPMENT", text: "URBAN_DEVELOPMENT" },
            { label: "WATER", text: "WATER" },
            { label: "WOMEN EMPOWERMENT", text: "WOMEN_EMPOWERMENT" }
          ],
          required: true
        },
        {
          name: "pan_number",
          type: "string",
          visible(m: any, r: any, g: any) {
            const org_type_accepted = m.type != "FOREIGN_COMPANY";
            return org_type_accepted;
          },
          displayName(m: any, r: any, g: any) {
            console.log("called", m.type, r, g);
            if (m.type == "PROPRIETORSHIP") {
              return "Pan No*";
            } else {
              return "Company's Pan No*";
            }
          },
          error: (model: any, f: any, global: any) => {
            const { pan_number } = model;
            if (pan_number) {
              const PAN_REGEX = new RegExp(
                /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/
              );
              const PAN_EMPTY_ERROR = "Please enter PAN number";
              const PAN_ERROR =
                "Invalid PAN number. Valid format is ABCDE1234F";
              const PAN_INVALID_ERROR = "Invalid PAN number.";
              if (!pan_number) {
                return PAN_EMPTY_ERROR;
              } else if (PAN_REGEX.test(pan_number) === false) {
                return PAN_ERROR;
              } else if (pan_number == "ABCDE1234F") {
                return PAN_INVALID_ERROR;
              }
            }
          }
          // hidden: false,
        },
        {
          name: "fcrn",
          displayName: "FCRN*",
          type: "string",
          visible(m: any, r: any, g: any) {
            const org_type_accepted = m.type == "FOREIGN_COMPANY";
            return org_type_accepted;
          },
          error(m: any, r: any, g: any) {
            const org_type_accepted = m.type == "FOREIGN_COMPANY";
            if (org_type_accepted) {
              return m.fcrn && m.fcrn.length != 6
                ? "Please enter a valid FCRN number"
                : !m.fcrn
                ? "Please enter a FCRN number"
                : "";
            }
          }
        },
        {
          name: "cin",
          displayName: "CIN*",
          type: "string",
          visible(m: any, r: any, g: any) {
            console.log("asdf", m, g);
            const org_type_accepted =
              m.type == "PRIVATE_LIMITED" ||
              m.type == "PUBLIC_LIMITED" ||
              m.type == "GOVERNMENT";
            return org_type_accepted;
          },
          error(m: any, r: any, g: any) {
            const org_type_accepted =
              m.type == "PRIVATE_LIMITED" ||
              m.type == "PUBLIC_LIMITED" ||
              m.type == "GOVERNMENT";
            if (org_type_accepted) {
              return m.cin && m.cin.length != 21
                ? "Please enter a valid CIN number"
                : !m.cin
                ? "Please enter a CIN number"
                : "";
            }
          }
        },
        {
          name: "llpin",
          displayName: "LLPIN*",
          type: "string",
          visible(m: any, r: any, g: any) {
            const org_type_accepted = m.type == "LIMITED_LIABILITY";
            return org_type_accepted;
          },
          error(m: any, r: any, g: any) {
            const org_type_accepted = m.type == "LIMITED_LIABILITY";
            if (org_type_accepted) {
              return m.llpin && m.llpin.length != 8
                ? "Please enter a valid LLPIN number"
                : !m.llpin
                ? "Please enter a LLPIN number"
                : "";
            }
          }
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
                  name: "company_type",
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
                  name: "pan_number",
                  size: 6
                },
                {
                  name: "fcrn",
                  size: 6
                },
                {
                  name: "cin",
                  size: 6
                },
                {
                  name: "llpin",
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
