import { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { AppContext } from '../../context/AppContext';
import NanoModal from './NanoModal';

const data = [
  {
    itemNum: 4,
    title: 'Item 4 -- Handwashing',
    NA: false,
    NO: true,
    id: 1,
  },
  {
    itemNum: 6,
    title: 'Item 6 -- bare handarm contact with food',
    NA: true,
    NO: true,
    id: 2,
  },
  {
    itemNum: 8,
    title:
      'Item 8 -- Eating, drinking, tobacco use; proper tasting procedures ',
    NA: false,
    NO: true,
    id: 3,
  },
  {
    itemNum: 11,
    title: 'Item 11 -- required records: shellstock tags',
    NA: true,
    NO: true,
    id: 4,
  },
  {
    itemNum: 12,
    title: 'Item 12 -- Food labels; original container; major food allergen',
    NA: false,
    NO: true,
    id: 5,
  },
  {
    itemNum: 13,
    title: 'Item 13 -- Leftovers',
    NA: true,
    NO: true,
    id: 6,
  },
  {
    itemNum: 14,
    title:
      'Item 14 -- Temperature Control for Safety (TCS) food: date marking, retention, disposition',
    NA: true,
    NO: true,
    id: 7,
  },
  {
    itemNum: 15,
    title: 'Item 15 -- Food separated & protected in storage',
    NA: true,
    NO: true,
    id: 8,
  },
  {
    itemNum: 16,
    title: 'Item 16 -- Fresh fruits and vegetables properly washed',
    NA: true,
    NO: false,
    id: 9,
  },
  {
    itemNum: 17,
    title: 'Item 17 -- Clean/sanitized food-contact surfaces',
    NA: true,
    NO: false,
    id: 10,
  },
  {
    itemNum: 20,
    title: 'Item 20 -- Food additives: approved; proper use',
    NA: true,
    NO: false,
    id: 11,
  },
  {
    itemNum: 22,
    title: 'Item 22 -- Gloves used properly',
    NA: true,
    NO: true,
    id: 12,
  },
  {
    itemNum: 23,
    title: 'Item 23 -- Wiping cloths: use; storage',
    NA: true,
    NO: false,
    id: 13,
  },
  {
    itemNum: 26,
    title: 'Item 26 -- Thawing frozen TCS foods',
    NA: true,
    NO: true,
    id: 14,
  },
  {
    itemNum: 27,
    title: 'Item 27 -- cooking & reheating time and temperatures',
    NA: true,
    NO: true,
    id: 15,
  },
  {
    itemNum: 28,
    title: 'Item 28 -- Fruits/Vegetables heated for hot holding',
    NA: true,
    NO: true,
    id: 16,
  },
  {
    itemNum: 29,
    title: 'Item 29 -- Cooling time & temperature',
    NA: true,
    NO: true,
    id: 17,
  },
  {
    itemNum: 30,
    title: 'Item 30 -- Cooling methods; adequate equipment',
    NA: true,
    NO: false,
    id: 18,
  },
  {
    itemNum: 31,
    title: 'Item 31 -- Hot holding temperature',
    NA: true,
    NO: true,
    id: 19,
  },
  {
    itemNum: 32,
    title: 'Item 32 -- Cold holding and storage',
    NA: true,
    NO: false,
    id: 20,
  },
  {
    itemNum: 33,
    title: 'Item 33 -- Consumer advisory; raw/undercooked food',
    NA: true,
    NO: false,
    id: 21,
  },
  {
    itemNum: 34,
    title:
      'Item 34 -- Time as public health control; HACCP; variance procedures',
    NA: true,
    NO: false,
    id: 22,
  },
  {
    itemNum: 35,
    title: 'Item 35 -- Thermometers provided and accurate',
    NA: true,
    NO: false,
    id: 23,
  },
  {
    itemNum: 36,
    title: 'Item 36 -- In-use utensil storage',
    NA: true,
    NO: false,
    id: 24,
  },
  {
    itemNum: 38,
    title: 'Item 38 -- Utensils, equipment, linens: drying, storage, handling',
    NA: true,
    NO: false,
    id: 25,
  },
  {
    itemNum: 40,
    title:
      'Item 40 -- Warewashing: equipment; procedures; cleaners & sanitizers; test kits',
    NA: true,
    NO: false,
    id: 26,
  },
  {
    itemNum: 43,
    title: 'Item 43 -- Potable water; plumbing system; cross connections',
    NA: true,
    NO: false,
    id: 27,
  },
  {
    itemNum: 49,
    title: 'Item 49 -- Ventilation & hoods: adequate, maintained',
    NA: true,
    NO: false,
    id: 28,
  },
  {
    itemNum: 50,
    title: 'Item 50 -- Ice machines properly maintained, operated',
    NA: true,
    NO: false,
    id: 29,
  },
];

const info = [
  {
    body: `Handwashing. Some of the provisions contained within this grouping are critical. Do not mark this item  “N/A.” This item may be marked “N/O” for operations only in the rare case when there are no food worker present at the time of inspection. This item is fully compliant only when employees are observed using proper handwashing techniques at appropriate times and places. If there are no food workers present, but the PIC accompanies the inspector on the inspection and touches food, clean equipment, or utensils without washing his/her hands, this item is marked noncompliant. Noncompliance also occurs when employees are observed using a food preparation sinks or other non-approved sinks for handwashing. To further demonstrate and emphasize compliance to this publication, inspectors should wash their hands before beginning the walk-through portion of the inspection.`,
    highlight:
      'This item may be marked “N/O” for operations only in the rare case when there are no food worker present at the time of inspection.',
  },

  {
    body: 'Bare hand/arm contact with food. The provision assessed within this item grouping is generally reported as critical; the exception applies to paragraph 3-301.11(C), which is designated as a swing item. This item may be marked “N/A” for establishments that provide only packaged or bulk food items that are not RTE. This item may be marked “N/O” for establishments that prepare RTE foods only, but no food preparation was performed at the time of inspection. This Item Number is also used to assess minimizing bare hand and arm contact with food that is not in an RTE form, such as meat being processed for retail sales. Compliance for this item occurs when employees are observed using suitable utensils or gloves to prevent bare hand contact with RTE foods or are observed properly following a pre-approved alternative procedure to “no bare hand contact.” This item should be marked “noncompliant” if one person is observed touching RTE food with his/her bare hands in the absence of a prior approval and written procedures for bare hand contact. A listing of conditions that must be met in order to receive prior approval by the regulatory authority are provided in subparagraph 3-301.11(D)(1)-(7). Bare hand contact by food employees serving a highly susceptible population is prohibited, and no alternative procedure to “no bare hand contact” is allowed with such a population. The swing violation for food that is not in RTE form under paragraph 3-301.11(C) is rated critical when the employee processing the food has unprotected cuts/wounds on exposed hands or arms. The swing violation may be assessed as noncritical if an employee processing or preparing food had exposed arms due to improper wear of the work coat (that is, sleeves were pushed up to the elbows), but there were no cuts or other open wounds on the hands or forearms. When the swing provision is assessed as noncritical and no other critical violation occur',
    highlight:
      'This item may be marked “N/A” for establishments that provide only packaged or bulk food items that are not RTE. This item may be marked “N/O” for establishments that prepare RTE foods only, but no food preparation was performed at the time of inspection.',
  },
  {
    body: 'Eating, drinking, tobacco use in food prep /service areas; tasting procedures. One of the provisions contained within this grouping is critical. Do not mark this item “N/A.” This item may be marked “N/O” only in the rare case when there are no food workers present at the time of inspection. Compliance is based on direct observations or discussions of the appropriate hygienic practices of food employees. Provision compliance occurs when food employees are observed drinking from a closed beverage container subsequently stored on a nonfoodcontact surface and separated from exposed food, clean equipment, and unwrapped single-service and single-use articles. This item should be marked “noncompliant” when food employees are observed improperly tasting food, eating, drinking, or smoking, or there is supporting evidence of these activities taking place in nondesignated areas of the establishment. An open container of liquid in the kitchen preparation area does not necessarily constitute marking this item “noncompliant.” Further discussion with a food employee or the PIC may be needed to determine if the liquid, if labeled, is used as an ingredient in food or may be an employee beverage that is consumed in another designated area. If the liquid is an open beverage that is consumed in a designated area, it must still be stored in a manner to prevent the contamination of food, equipment, utensils, linens and single-service/ single-use articles.',
    highlight:
      'This item may be marked “N/O” only in the rare case when there are no food workers present at the time of inspection.',
  },
  {
    body: 'Required records: shellstock tags, parasite destruction. Three out of four provisions contained within this grouping are critical. This item may be marked “N/A” when shellstock are not used in the establishment, and the only fish sold as raw, raw-marinated, or undercooked is the tuna species or aquacultured fish listed in this publication as exempted from freezing. This item may be marked “N/O” when shellstock or raw, raw-marinated, and undercooked fish are sold periodically in the establishment, but are not being sold at the time of inspection, and prior compliance through tags, invoices, or purchase records cannot be verified. Compliance determination is based on direct observations of fish in storage, shellstock tags, and/or records of freezing of fish for parasite destruction. This item is “compliant” if the PIC provides a statement from supplier(s) identifying that fish sold as raw, rawmarinated, or undercooked is frozen by the supplier for parasite destruction; or there are freeze records maintained by the food establishment when fish are frozen for parasite destruction on the premises. This item should be marked “noncompliant” if there are no shellstock tags available, when the shellstock tags are incomplete, when there is evidence of commingling of shellstock, or when no records of freezing of fish',
    highlight:
      'This item may be marked “N/A” when shellstock are not used in the establishment, and the only fish sold as raw, raw-marinated, or undercooked is the tuna species or aquacultured fish listed in this publication as exempted from freezing. This item may be marked “N/O” when shellstock or raw, raw-marinated, and undercooked fish are sold periodically in the establishment, but are not being sold at the time of inspection, and prior compliance through tags, invoices, or purchase records cannot be verified.',
  },
  {
    body: 'Food labels; original container; major food allergens. Do not mark this item “N/A.” This item may be marked “N/O” if there were no bulk foods removed from their original packaging present in the facility at the time of the inspection and food packaging is not conducted at the establishment. Packaged foods are required to conform to specific labeling laws. Foods packaged within the food establishment, such as cook-chill products and bulk foods (meals-to-go) available for consumer self-dispensing (3-602.11(C)), must also conform to the appropriate labeling laws, with considerations given to accuracy of the labels as well as to their not being misleading. Minimum labeling requirements for individually wrapped items and boxed meals include the common name or description of each item prepared by the food establishment and should specify when major food allergens are included as an ingredient. Working containers and bulk foods removed from their original packaging require some level of assessment as to how recognizable the food is without labeling it by its common name. Labels for working containers should provide a date indicating when the product was opened; date marking and retention for these products as specified in 3-501.17 are assessed using Item 14. Molluscan shellfish and vended TCS foods must be assessed based on their specific packaging and labeling requirements. The visual quality of a food must not be misrepresented by using color-enhancing additives, special lighting, or color overwraps to increase consumer perception of the product’s freshness.',
    highlight:
      'This item may be marked “N/O” if there were no bulk foods removed from their original packaging present in the facility at the time of the inspection and food packaging is not conducted at the establishment.',
  },
  {
    body: 'Leftovers. Deficiencies noted within this item represent a critical violation. This item may be marked “N/A” if the food facility has an established policy that prohibits the retention of leftover foods. This item may be marked “N/O” if the establishment does practice the retention of leftovers, but there were no leftover foods present in the facility at the time of the inspection. Noncompliance occurs when labels are missing or do not contain the item name and the date and time the item was removed from service; leftovers are retained beyond the maximum retention period; prohibited items are retained; improper reheating temperature; freezing leftovers; subsequent retention of a leftover or foods containing a previously leftover item; or serving leftovers to a highly susceptible population. A non-TCS leftover that was removed from a customer self-service line or display case and is showing signs of contamination due to comingling with a TCS food or other debris as characterized in 3-501.110(A) is marked as a violation using Item 18.',
    highlight:
      'This item may be marked “N/A” if the food facility has an established policy that prohibits the retention of leftover foods. This item may be marked “N/O” if the establishment does practice the retention of leftovers, but there were no leftover foods present in the facility at the time of the inspection.',
  },
  {
    body: 'TCS food: date marking, retention, & disposition. All violations contained within this item grouping are reported as critical. This item may be marked “N/A” when the food processes occurring within the operation do not include, at any time, the preparation of RTE, TCS foods on-premises and holding the RTE TCS food beyond the current business day; and at no time are commercial containers of bulk RTE, TCS food opened and held beyond the current business day at the establishment. This item may be marked “N/O” when the establishment does handle foods requiring date marking, but there are no foods requiring date marking in the facility at the time of inspection. Compliance for date marking is generally found when there is a system in place for date marking all foods that are required to be date marked and such a system is verified through observation. If date marking applies to the establishment, the PIC should be asked to describe the methods used to identify product shelf life or “consume-by” dating. The regulatory authority must be aware of food products that are listed as exempt from date marking, as specified in the provision. Compliance for food disposition occurs when foods are properly date labeled and are within the prescribed date marked time limits. Violations involving outdated food, as indicated by exceeding the “use-by,” “sell-by,” or other manufacturer’s specified “expiration” date, are marked using Item 51 and provision 3-503.11.',
    highlight:
      'This item may be marked “N/A” when the food processes occurring within the operation do not include, at any time, the preparation of RTE, TCS foods on-premises and holding the RTE TCS food beyond the current business day; and at no time are commercial containers of bulk RTE, TCS food opened and held beyond the current business day at the establishment. This item may be marked “N/O” when the establishment does handle foods requiring date marking, but there are no foods requiring date marking in the facility at the time of inspection.',
  },
  {
    body: '',
    highlight: '',
  },
  {
    body: 'Fresh fruits and vegetables properly washed. This item may be marked “N/A” if Fresh fruits and vegetables are not prepared by the food establishment and the service of Fresh fruits and vegetables, when practiced, is limited to commercially packaged items portioned for individual sale (for example, salads and fruit bowls). This item may not be marked “N/O.” Chemicals are allowed for washing fruits and vegetables, as is washing them in water. Raw fruits and vegetables are to be washed prior to their preparation or being offered as RTE. Discussion with the PIC and food employees will help determine the establishment’s practice. This item is marked “noncompliant” when Fresh fruits and vegetables are not washed to remove visible soil. Violations involving use of unauthorized chemicals are to wash or disinfect Fresh fruits and vegetables are assessed using Item 25.',
    highlight:
      'This item may be marked “N/A” if Fresh fruits and vegetables are not prepared by the food establishment and the service of Fresh fruits and vegetables, when practiced, is limited to commercially packaged items portioned for individual sale',
  },
  {
    body: 'Clean/sanitizing food-contact surfaces. All of the provisions assessed within this item grouping are critical. This item may be marked “N/A” only when there is no requirement to clean equipment and utensils such as when only prepackaged foods are sold. This item may not be marked “N/O.” Compliance is based on direct observations regarding cleanliness of food contact surfaces of equipment and utensils; observing cleaning and sanitizing procedures; discussion of cleaning and sanitizing procedures with the PIC or other food employees; and actual measurements/readings of chemical sanitizer concentration and/or hot water sanitizing temperature using test strips, heat-sensitive tapes, and calibrated thermometers, as appropriate. There should be an overall assessment of the food-contact surfaces of equipment and utensils located in clean storage (shelves and racks) and in use (dispensers) to determine compliance. For example, this item is not marked “out of compliance” based on one visibly soiled utensil, such as a plate or knife. This item must be marked “noncompliant” when manual and/or mechanical methods of cleaning and sanitizing food-contact surfaces of equipment and utensils are ineffective or if one multiuse piece of equipment such as a slicer or can opener is visibly soiled and being used at the time of the inspection. The inspector must assess whether such food residue is the result of current or prior use. Cleanliness of cooking and baking equipment (for example, griddle tops, waffle irons, and oven interior) presents a low risk; violations associated with unclean cooking or baking equipment are noncritical and are marked using Item 41. Compliance regarding proper use of warewashing equipment and manual and mechanical warewashing procedures is assessed using Item 40.',
    highlight:
      'This item may be marked “N/A” only when there is no requirement to clean equipment and utensils such as when only prepackaged foods are sold.',
  },
  {
    body: 'Food additives: approved, proper use. All violations contained within this item grouping are reported as critical. This item may be marked “N/A” if the food establishment does not use any additives or sulfites on the premises. Do not mark this item “N/O.” Compliance is based on direct observations of food ingredients in storage and listed as product ingredients, supplemented by discussion with the PIC. This item is compliant if approved food and color additives are onsite and used properly or if sulfites are on the premises but are not applied to fresh fruits/vegetables for raw consumption. Approved food additives are listed and have threshold limits IAW the CFRs; this item does not apply to food additives that are considered GRAS, such as salt, pepper, etc. This item group is marked “noncompliant” if unapproved additives are found on the premises or if approved additives are improperly used, such as sulfites being applied to fresh fruits or vegetables.',
    highlight:
      'This item may be marked “N/A” if the food establishment does not use any additives or sulfites on the premises.',
  },
  {
    body: 'Gloves used properly. This item may be marked “N/A” when only commercially-packaged, RTE foods are served at the food establishment. This item may be marked “N/O” in the rare case when there is no food preparation or service occurring at the time of the inspection. The observation of food preparation activities and glove use by food employees is necessary. There should be a discussion with the PIC on how gloves are used, if applicable, in food preparation activities. If misused, gloves may serve as a source of cross-contamination. Look at the package label to ensure powdered gloves are suitable for use with food.',
    highlight:
      'This item may be marked “N/A” when only commercially-packaged, RTE foods are served at the food establishment. This item may be marked “N/O” in the rare case when there is no food preparation or service occurring at the time of the inspection.',
  },
  {
    body: 'Wiping cloths: use, storage. This item may be marked “N/A” when only commercially packaged RTE foods are served at the food establishment. Do not mark this item “N/O.” Wiping cloths are to be used for a designated purpose and properly used. When stored in solution, the solutions should be reasonably clean and maintained at the proper sanitizer concentration (4-501.114). Solutions exceeding the recommended sanitizer concentrations are assessed using Item 25. Sponges, if present, are not to be used in contact with clean/sanitized food contact surfaces.',
    highlight:
      'This item may be marked “N/A” when only commercially packaged RTE foods are served at the food establishment.',
  },
  {
    body: 'Thawing frozen TCS foods. This item may be marked “N/A” if TCS foods are not thawed or slacked; frozen foods used at the facility are cooked from a frozen state. This item may be marked “N/O” if food is sometimes thawed, but thawing was not observed during the inspection. Observing and then gaining an understanding of the establishment’s thawing method(s) will help in determining whether a violation of the approved thawing methods found under 3-501.13 exists, as well as the level of risk imposed. Keep in mind that various food products, especially those destined for deep-fat frying, are often slacked (not thawed) prior to cooking.',
    highlight:
      'This item may be marked “N/A” if TCS foods are not thawed or slacked; frozen foods used at the facility are cooked from a frozen state.',
  },
  {
    body: 'Cooking/reheating time & temperatures. All violations contained within this item grouping are reported as critical. This item may be marked “N/A” if the food establishment only serves prepackaged RTE foods. This item may be marked “N/O” when the inspector is unable to determine the cooking temperature of any food because cooking activities have already been completed. The inspection should be arranged at an optimum time for measuring at least one item as it nears its terminal cooking time. NOTE: The cooking temperatures of foods must be measured to determine compliance or noncompliance. Do not rely upon discussions with managers or cooks to make a compliance determination. The temperature of raw animal foods in each species cooked during the inspection should be taken. For instance, if the facility fries chicken, scrambles eggs, bakes fish, grills hamburgers, and slow-roasts prime rib during the inspection, the cook temperatures of all of the products should be measured and recorded. Temperatures, both in compliance and out of compliance, should be recorded in the “Temperature Observations” section of the inspection report. The time of inspections should be varied so that cooking can be observed. Use a calibrated food temperature measuring device to check food items prior to their placement in hot holding. This item group should be marked “noncompliant” if the food items checked do not meet the temperature requirements for cooking and if the employee doing the cooking attempts to serve the product without returning it to the cooking process. Reheated food items are noncompliant if the food is not reheated to the required temperatures or reheated within 2 hours prior to hot holding. Improper reheating of leftovers is assessed in Item 13. If a food is undercooked (cooked below the required temperature) but the facility has an approved Consumer Advisory or an approved variance within the HACCP plan for that food item, the item is considered to be compliant; record the temperature and document the reason it is in compliance. A violation involving undercooked foods without a Consumer Advisory is marked using Item 33.',
    highlight:
      'This item may be marked “N/A” if the food establishment only serves prepackaged RTE foods. This item may be marked “N/O” when the inspector is unable to determine the cooking temperature of any food because cooking activities have already been completed.',
  },
  {
    body: 'Fruits/vegetables heated for hot holding. This item may be marked “N/A” if vegetables and fruits are not cooked for hot holding in the establishment. This item may be marked “N/O” when plant foods are cooked for hot holding but are not available for observation during the inspection. In determining compliance, observation must occur, and an actual cooking temperature must be obtained.',
    highlight:
      'This item may be marked “N/A” if vegetables and fruits are not cooked for hot holding in the establishment. This item may be marked “N/O” when plant foods are cooked for hot holding but are not available for observation during the inspection. In determining compliance, observation must occur, and an actual cooking temperature must be obtained.',
  },
  {
    body: 'Cooling time & temperatures. The provision assessed within this item is critical. This item may be marked “N/A” when the establishment does not receive raw eggs, shellstock, or milk; prepares no TCS food from ambient temperature ingredients that require cooling; and does not cool cooked TCS food. This item may be marked “N/O” when the establishment does cool TCS food, but proper cooling per the prescribed temperature and time parameters cannot be determined during the length of the inspection. NOTE: The requirement for cooling cooked TCS food is that the food must be cooled from 135°F to 41°F or less in 6 hours, provided that the food is cooled from 135°F to 70°F within the first 2 hours. There are two critical limits that must be met with cooling. Discussions with the PIC along with observations should be used to determine compliance. For instance, during discussion, the PIC states that a food product was cooled overnight in the walk-in cooler. The product is checked, and its temperature is 50°F. Eight hours have elapsed from closing to opening. This item should be marked “noncompliant” because the product did not cool from 135°F to 70°F within 2 hours and from 135°F to 41°F or less within a total of 6 hours. Temperatures that are in compliance and out of compliance should be recorded in the “Temperature Observations” section of the inspection report. Because the entire cooling process is difficult to observe during an inspection, a determination of whether foods are currently being cooled should be made at the onset of the inspection. If cooling is taking place, temperature measurements should be made to determine whether proper cooling is possible with the procedures being used. Compliance for this provision should be based on actual temperatures of TCS foods in the cooling process. The basis for determining compliance can also be supported through discussion and/or record review which would provide the inspector with reliable data of the “start time” for cooling from 135°F.',
    highlight:
      'This item may be marked “N/A” when the establishment does not receive raw eggs, shellstock, or milk; prepares no TCS food from ambient temperature ingredients that require cooling; and does not cool cooked TCS food. This item may be marked “N/O” when the establishment does cool TCS food, but proper cooling per the prescribed temperature and time parameters cannot be determined during the length of the inspection.',
  },
  {
    body: 'Cooling methods; adequate equipment. This item may be marked “N/A” when the establishment does not receive raw eggs, shellstock, or milk; prepares no TCS food from ambient temperature ingredients that require cooling; and does not cool cooked TCS food. Do not mark this item “N/O.” A determination must first be made that cooling food is part of the processing step. To assess whether or not the methods used facilitate the cooling criteria specified under 3-501.14, a discussion with the PIC should support actual observations of the cooling methods in use. There should be enough equipment with sufficient capacity used for the cooling, heating, and hot/cold holding/storage of foods requiring temperature control, as specified in Chapter 3, to meet the demands of the operation. Observations must support the determination of compliance status.',
    highlight:
      'This item may be marked “N/A” when the establishment does not receive raw eggs, shellstock, or milk; prepares no TCS food from ambient temperature ingredients that require cooling; and does not cool cooked TCS food.',
  },
  {
    body: 'Hot holding. The provision assessed within this item is critical. This item may be marked “N/A” if the establishment does not hot-hold food or if it uses TPHC. This item may be marked “N/O” when the establishment does hot-hold foods, but no foods are being held hot during the time of the inspection. Inspections should be conducted during a time when hot holding temperatures can be taken. NOTE: Temperatures in compliance and out of compliance should be recorded in the “Temperature Observations” section of the inspection report. Compliance for this item is based on actual food temperature measurements taken using a calibrated food temperature measuring device. Unless TPHC is used for the TCS food found out of compliance, this item is marked “noncompliant.” Evaluation of TPHC is assessed under Item 34.',
    highlight:
      'This item may be marked “N/A” if the establishment does not hot-hold food or if it uses TPHC. This item may be marked “N/O” when the establishment does hot-hold foods, but no foods are being held hot during the time of the inspection.',
  },
  {
    body: 'Cold holding/storage. This item may be marked “N/A” when the establishment does not cold-hold food. This item may not be marked “N/O.” NOTE: Temperatures in or out of compliance should be recorded in the “Temperature Observations” section of the inspection report. Compliance is based on actual temperature measurements of food or on a combined assessment of the equipment’s ambient temperature and the internal temperature of food held in the equipment, taken using a calibrated food temperature measuring device. Discussions should be made with the PIC to determine if a food is in the process of cooling, TPHC is used, or there is an approved method to render a food so that it is not TCS food. This item should be marked “noncompliant” if one TCS food is found to be out of temperature, with supportive evidence, unless TPHC is used for that TCS food. Foods intended to be stored under freezer conditions that are found partially thawed due to inadequate freezer holding temperatures are evaluated against provisions 3-501.11 and 3-503.11(E) and violations are marked using Item 51.',
    highlight:
      'This item may be marked “N/A” when the establishment does not cold-hold food.',
  },
  {
    body: 'Consumer advisory: raw/undercooked food. The provision assessed within this item is critical. This item may be marked “N/A” when a food establishment does not serve an RTE food that necessitates an advisory (that is, an animal food that is raw, undercooked, or not otherwise processed to eliminate pathogens). Do not mark this item “N/O.” Assessment of this item is based on a thorough review with the PIC of the posted, written, and special/daily menus to determine if untreated shell eggs, meats, fish, or poultry is used as an ingredient or is ordered as a raw, raw-marinated, partially cooked, or undercooked food. The advisory also applies to shellstock offered for sale from a retail service case. This item is compliant if the establishment provides an advisory that meets the intent of this publication for both the disclosure and reminder components. This item should be marked “noncompliant” when raw or undercooked foods are served or sold and there is no consumer advisory; the food item is not disclosed; or there is no reminder statement. The consumer advisory does not exempt the requirement for freezing for parasite control, nor should it be used for foods that have only gone through the initial heating and cooling stages of a noncontinuous cooking process.',
    highlight:
      'This item may be marked “N/A” when a food establishment does not serve an RTE food that necessitates an advisory',
  },
  {
    body: 'Time as a public health control; HACCP; variance procedures. Some of the provisions contained within this grouping are critical. This item may be marked “N/A” when the establishment does not use “time only” as the public health control; the establishment is not required by the regulatory authority to have a variance or HACCP plan; juice is not packaged; or ROP is not done on the premises. Do not mark this item “N/O.” This item is assessed by direct observations, record review, a discussion with the PIC to determine if there are specialized food processes (that is, smoking food, curing food, ROP, using food additives to render a food so that it is not TCS food, cook chill, sous vide, etc.), and the review of any standing operating procedures to determine if the intent of this publication for use of TPHC is met and proper HACCP documentation is achieved. NOTE: When a food establishment wants to deviate from a requirement in this publication, utilizing Specialized Processing Methods as specified in 3-502.11, such as Smoking Food for Preservation or curing food, a variance must first be obtained from the regulatory authority. A HACCP plan may also be required as listed in 8-201.13(A) as part of the variance request.',
    highlight:
      'This item may be marked “N/A” when the establishment does not use “time only” as the public health control; the establishment is not required by the regulatory authority to have a variance or HACCP plan; juice is not packaged; or ROP is not done on the premises.',
  },
  {
    body: 'Thermometers: provided & accurate. This item may be marked “N/A” if the establishment only dispenses non-TCS foods. Do not mark this item “N/O.” Thermometers provide a means for assessing active managerial control of TCS food temperatures and sanitizing rinse for warewashing. Determine compliance by observing the in-use storage location and verifying the scaling of the temperature measuring devices in the range of use to measure food, water, or ambient air temperatures. Food thermometers must be calibrated at a frequency to ensure accuracy. Food thermometers should be accessible for use by employees and have a probe size appropriate to the food item.',
    highlight:
      'This item may be marked “N/A” if the establishment only dispenses non-TCS foods.',
  },
  {
    body: 'In-use utensil storage. This item may be marked “N/A” if the establishment only dispenses commercially prepackaged foods. Do not mark this item “N/O.” Based on the type of operation, there are a number of methods available for storage of in-use utensils during pauses in food preparation or dispensing, such as in the food, clean and protected, or under running water to prevent bacterial growth. If utensils are stored in a container of water, the water temperature must be at least 135°F. In-use utensils may not be stored in chemical sanitizer or ice between uses. Ice scoops may be stored with their handles up in an ice bin/tray.',
    highlight:
      'This item may be marked “N/A” if the establishment only dispenses commercially prepackaged foods.',
  },
  {
    body: 'Utensils, equipment, linens: drying, storage, handling. This item may be marked “N/A” if the establishment only dispenses commercially packaged RTE TCS foods or non-TCS foods and only utilizes singleuse/ single-service articles. Do not mark this item “N/O.” An assessment is made of the overall storage practices and handling of clean equipment, utensils, and tableware located in the various areas within an establishment, to include the basement, wait station and dining room. Equipment must be air-dried prior to storage, and linens must be properly cleaned and stored. Violations involving single-use/single-service items are marked using Item 39.',
    highlight:
      'This item may be marked “N/A” if the establishment only dispenses commercially packaged RTE TCS foods or non-TCS foods and only utilizes singleuse/ single-service articles.',
  },
  {
    body: 'Warewashing: equipment, procedures, cleaners/sanitizers, test kits. This item may be marked “N/A” if the establishment only dispenses commercially packaged RTE TCS foods or non-TCS foods and if only singleuse/ single-service articles are provided to customers eating on the premises. Do not mark this item “N/O.” Adequate warewashing facilities and supplies must be available and used for the cleaning and sanitization of food contact surfaces, including the availability of means to monitor the concentration of chemical sanitizers. Observations of manual and mechanical warewashing methods are made to assess the procedure for cleaning and sanitizing equipment and utensils. Compliance with the criteria for proper sanitizing (temperature or chemical concentration) is assessed in Item 17. Compliance for air drying cleaned and sanitized equipment and utensils is assessed using Item 38.',
    highlight:
      'This item may be marked “N/A” if the establishment only dispenses commercially packaged RTE TCS foods or non-TCS foods and if only singleuse/ single-service articles are provided to customers eating on the premises.',
  },
  {
    body: 'Potable water; plumbing system; cross-connections. Some of the provisions contained within this grouping are critical. This item may be marked “N/A” for temporary and mobile food establishments when there is no connection to a plumbing system--for drinking water or nondrinking water--a mobile water tank, or well. Do not mark this item “N/O.” A cross-connection survey of the complete plumbing system is generally conducted during preoperational inspections. An assessment of the layout of the establishment and the water distribution system is made to determine if there are any points at which the potable water supply is subject to contamination or is in disrepair. The inspector examines equipment, devices, and drainage lines connected to the potable water supply to determine whether a violation exists. When a nonregulated water supply (for example, well) is used and there is no evidence of water quality testing as required under 5-102.13 and 5-102.14, the water supply is considered to be nonapproved and results in a violation of provision 5-101.11. Unregulated wells must be inspected and sampled to ensure compliance with drinking water standards prior to being used to supply a food event or establishment. Sampling should be conducted within 30 days of the intended use if routine periodic sampling is not conducted multiple times throughout the year. The vendor must retain a copy of the sampling results as proof of potability. Wells that are routinely monitored for regulatory compliance are “regulated” and associated sampling results are generally retained by the installation.',
    highlight:
      'This item may be marked “N/A” for temporary and mobile food establishments when there is no connection to a plumbing system--for drinking water or nondrinking water--a mobile water tank, or well.',
  },
  {
    body: 'Ventilation & hoods: adequate, maintained. This item may be marked “N/A” if the establishment only dispenses commercially packaged RTE foods. Do not mark this item “N/O.” Observations should be made to ensure that the ventilation is adequately preventing an accumulation of condensation, grease, or other soil from potentially contaminating food and the surrounding environment. Provision 6-304.11(E) may only be cited on an inspection when air velocity measurements are taken using an appropriate air velocity meter. Hood and fan velocities are typically assessed during preoperational inspections and are not normally measured during routine sanitation inspections. Indications of poor ventilation are cited using 6-304.11(A) when velocity measurements are not taken.',
    highlight:
      'This item may be marked “N/A” if the establishment only dispenses commercially packaged RTE foods.',
  },
  {
    body: 'Ice machines properly maintained, operated. This item may be marked “N/A” if the establishment does not have an ice machine on the premises. Do not mark this item “N/O.” Location of ice machines should not present a risk for ice contamination. Patrons of the food establishment should not have access to ice machines supporting food operations. Proper maintenance of ice machines is assessed through observation of mold and other residues inside of the ice bin and condensation coils. Filter changes should be conducted IAW manufacturers specifications and properly documented as specified in paragraph 4-503.11(D). Potential cross-contamination associated with the location of condensation drainage lines or water supply lines should be addressed using Item 43.',
    highlight:
      'This item may be marked “N/A” if the establishment does not have an ice machine on the premises.',
  },
];

const Nano = () => {
  const { nanoValues, setNanoValues, setNanoModalVisible, setNanoInfo } =
    useContext(AppContext);

  handleNAPress = (itemNum, i) => {
    setNanoValues(prevNanoValues => {
      const updatedNanoValues = [...prevNanoValues];
      updatedNanoValues[i] = {
        ...updatedNanoValues[i],
        NA: !updatedNanoValues[i]?.NA,
        formIdNA: `item__${itemNum}__NA`,
      };
      return updatedNanoValues;
    });
  };

  handleNOPress = (itemNum, i) => {
    setNanoValues(prevNanoValues => {
      const updatedNanoValues = [...prevNanoValues];
      updatedNanoValues[i] = {
        ...updatedNanoValues[i],
        NO: !updatedNanoValues[i]?.NO,
        formIdNO: `item__${itemNum}__NO`,
      };
      return updatedNanoValues;
    });
  };

  handleInfoPress = i => {
    setNanoInfo(info[i]);
    setNanoModalVisible(true);
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.NANOCard}>
          <View>
            <Text style={styles.NANOCardLabel}>{item.title}</Text>
          </View>
          <View style={styles.NANOCardBottomRow}>
            <TouchableOpacity onPress={() => handleInfoPress(index)}>
              <Image
                style={styles.infoIcon}
                source={require('../../../assets/images/info__icon.png')}
              />
            </TouchableOpacity>
            <View style={styles.NANOContent}>
              {item.NA && (
                <View style={styles.NANOContainer}>
                  <View>
                    <Text style={styles.NANOLabel}>N/A</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={
                        nanoValues[index]?.NA === true
                          ? styles.NANOButtonPressed
                          : styles.NANOButton
                      }
                      onPress={() => handleNAPress(item.itemNum, index)}
                    ></TouchableOpacity>
                  </View>
                </View>
              )}
              {item.NO && (
                <View style={styles.NANOContainer}>
                  <View>
                    <Text style={styles.NANOLabel}>N/O</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={
                        nanoValues[index]?.NO === true
                          ? styles.NANOButtonPressed
                          : styles.NANOButton
                      }
                      onPress={() => handleNOPress(item.itemNum, index)}
                    ></TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <NanoModal />
      <FlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 400,
  },
  infoIcon: {
    height: 25,
    width: 25,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  NANOCard: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    padding: 8,
    width: 400,
    height: 110,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  NANOCardLabel: {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: 'Kite-One',
  },
  NANOCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  NANOContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 300,
  },
  NANOContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  NANOButton: {
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 3,
    borderRadius: 5,
  },
  NANOButtonPressed: {
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 3,
    borderRadius: 5,
    backgroundColor: '#dd2c00',
  },
  NANOLabel: {
    margin: 3,
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Raj',
  },
  naivgateButton: {
    textTransform: 'uppercase',
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: '#4dd0e1',
    padding: 15,
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },
  navigateButtonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Raj',
  },
});

export default Nano;
