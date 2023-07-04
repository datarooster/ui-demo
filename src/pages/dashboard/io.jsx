export async function sendOpenAIRequest(prompt) { 
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    let payload = {
       model: 'gpt-3.5-turbo-0613',
         messages: [{
            role: 'system',
            content: 'You are a helpful assistant.'
         }, {
            role: 'user',
            // content: 'create a rule to monitor volume by specific column merchant on window of 3 hours'
            content: prompt
         }],
         functions: [
            {
               "name": "createRule",
               "description": "Create a new rule based on the provided parameters",
               "parameters": {
                 "type": "object",
                 "properties": {
                   "category": {
                     "type": "string",
                     "description": "The category of the rule. It can be 'Volume', 'Validity', 'Schema', 'Data Loss', or 'Anomalies'."
                   },
                   "enabled": {
                     "type": "boolean",
                     "description": "The status of the rule. If true, the rule is enabled."
                   },
                   "segment": {
                     "type": "string",
                     "description": "The segmentation method of the rule. How we want to monitor by. It can be 'Total' to monitor the entire data moving in or 'By Segment' to monitor it by specific columns - can be one column or several."
                   },
                   "windowSize": {
                     "type": "string",
                     "description": "The window size of the rule. It can be '5m', '15m', '30m', '1h', or '24h'."
                   },
                   "segmentColumns": {
                     "type": "array",
                     "items": {
                       "type": "string"
                     },
                     "description": "if segmentation is 'By Segment' this is required - The columns to segment the rule by"
                   },
                   "action": {
                     "type": "string",
                     "description": "The action of the rule. The options depend on the category. For 'Validity' category, it can be 'not_null', 'in_set', or 'condition'. For 'Volume' category, it can be 'spikes' or 'drops'. For 'Schema' category, it can be 'compatibility' or 'new_columns' or 'column_exists'. For 'Data Loss' category, it can be 'decoding_errors'. For 'Anomalies' category, it can be 'value_spikes' or 'value_drops'."
                   },
                   "expression": {
                     "type": "string",
                     "description": "The expression of the rule. This is required if the action is 'condition' or 'in_set'. For 'condition', it should be a condition expression like 'revenue > 0'. For 'in_set', it should be a set of values like 'value:[1,2,3,4]'."
                   }                   
                 },
                 "required": ["category", "description", "enabled", "segment", "windowSize", "action"]
               
                    }   
                  }
       ],

       max_tokens: 100,
       temperature: 0.7
    };

   const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
   });

   const data = await response.json();
   const choice = data.choices[0];
   if (choice.finish_reason === 'function_call') {
      const args = JSON.parse(choice.message.function_call.arguments);
      return args;
   }
   return null;

  }
