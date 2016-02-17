var csv           = require('./csv');
var db            = require('../server/database');

var Users = db.users;

var csvHeaders = {
  DEALERS: {
    headers: [
      'dealer_code',
      'dealer_name',
      'dealer_address_1',
      'dealer_city',
      'dealer_state',
      'dealer_zip',
      'dealer_1'
    ]},
  USERS: {
    headers: [
      'user_90005738',      
      'user_after_90005738',
      'user_last_name',     
      'user_first_name',    
      'user_address_1',     
      'user_address_2',     
      'user_city',         
      'user_state',         
      'user_zip'           
    ]},
  CONTRACTS: {
    headers: [
      'contract_after_user_zip',
      'contract_08ZAKEQ',
      'contract_ULTWINT',
      'contract_coverage_option_i_think',
      'contract_coverage_months',
      'contract_beginning_mileage',
      'contract_coverage_miles',
      'contract_.00',
      'contract_vehicle_year',
      'contract_vin',
      'contract_29',
      'contract_make',
      'contract_model',
      'contract_model_code',
      'contract_date_1',
      'contract_date_2',
      'contract_date_3',
      'contract_date_4',
      'contract_expired',
      'contract_email',
      'contract_600.00',
      'contract_203.00'
    ]}
};

var csvAllHeaders = csvHeaders.DEALERS.headers.
                     concat(csvHeaders.USERS.headers).
                     concat(csvHeaders.CONTRACTS.headers);

var csvUserHeaders = {
      'last_name'     : 'user_last_name',
      'first_name'    : 'user_first_name',
      'address_1'     : 'user_address_1',
      'address_2'     : 'user_address_2',
      'city'          : 'user_city',
      'state'         : 'user_state', 
      'zip'           : 'user_zip',          
      'local.email'   : 'contract_email'
    };
       
var inputFile='ZakContracts.txt';

//csv.readFile(inputFile);

csv.importFile (inputFile, 
                csvAllHeaders, 
                csvHeaders.DEALERS.headers,
                csvUserHeaders,
                csvHeaders.CONTRACTS.headers);
