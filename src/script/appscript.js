// Main function to handle GET requests
function doGet(e) {
    try {
      console.log("doGet called with event:", e);
  
      // Open the spreadsheet by ID
      var spreadsheetId = '15RteQNnmEmd8QPvIkBa7Arz4Br_u4XuGQ5p41OZU5rk';
      var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      console.log("Spreadsheet opened:", spreadsheet.getName());
  
      // Get data from the first sheet
      var sheet = spreadsheet.getSheets()[0];
      console.log("Using sheet:", sheet.getName());
  
      // Fetch all values from the sheet
      var values = sheet.getDataRange().getValues();
      console.log("Fetched values from sheet:", values);
  
      // Convert sheet data to JSON
      var headers = values[0];
      console.log("Headers:", headers);
      var jsonData = values.slice(1).map(function (row) {
        var obj = {};
        headers.forEach(function (header, index) {
          var value = row[index];
          // Format date fields
          if (value instanceof Date) {
            value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
          }
          obj[header.toString().trim().replace(/\s+/g, '_')] = value;
        });
        return obj;
      });
      console.log("JSON Data:", jsonData);
  
      // Prepare the response
      var data = {
        status: 'success',
        data: jsonData,
      };
  
      // Return the JSON response with CORS headers
      return sendJsonResponse(data);
    } catch (error) {
      console.error("Error in doGet:", error);
      // Return error response with CORS headers
      return sendJsonResponse({
        status: 'error',
        message: error.toString(),
      });
    }
  }
  
  // Function to send JSON responses with proper CORS headers
  function sendJsonResponse(data) {
    var response = ContentService.createTextOutput(JSON.stringify(data));
    response.setMimeType(ContentService.MimeType.JSON);
  
    // Add CORS headers
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  
    return response;
  }
  
  // Function to handle OPTIONS requests (CORS preflight requests)
  function doOptions(e) {
    console.log("doOptions called with event:", e || "undefined");
    return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  
  // Wrapper to handle the request and lock
  function handleRequest(e) {
    var lock = LockService.getScriptLock();
    console.log("Attempting to acquire lock...");
  
    // Try to acquire the lock
    if (!lock.tryLock(10000)) {
      console.error("Failed to acquire lock.");
      return sendJsonResponse({
        status: 'error',
        message: 'Unable to process request due to lock acquisition failure.',
      });
    }
  
    try {
      var method = "GET"; // Default method is GET
      console.log("Received event:", e);
  
      if (e) {
        // Log postData presence for debugging
        if (e.postData) {
          console.log("PostData received:", e.postData);
        } else {
          console.log("No postData, assuming GET request.");
        }
        method = e.postData ? "POST" : "GET"; // Default to GET unless postData is present
      }
  
      console.log("Request method:", method);
  
      // Handle different request methods
      if (method === "GET") {
        console.log("Handling GET request...");
        return doGet(e); // Call doGet for GET requests
      } else if (method === "OPTIONS") {
        console.log("Handling OPTIONS (CORS preflight) request...");
        return doOptions(e); // Handle OPTIONS preflight request for CORS
      } else {
        console.warn("Unsupported request method:", method);
        return sendJsonResponse({
          status: 'error',
          message: 'Unsupported method',
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle unexpected errors and return error response
      return sendJsonResponse({
        status: 'error',
        message: error.toString(),
      });
    } finally {
      console.log("Releasing lock...");
      lock.releaseLock(); // Ensure lock is released after processing
    }
  }
  