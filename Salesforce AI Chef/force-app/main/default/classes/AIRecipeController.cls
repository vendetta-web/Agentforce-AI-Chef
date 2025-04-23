/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 04-23-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class AIRecipeController {
    @AuraEnabled
    public static String generateAIRecipes(String ingredients, String dietaryRestrictions, String mealType, String servings) {
        try{
            //First will create a Map to hold the input Values

           Map<String, ConnectApi.WrappedValue> inputParams = new Map<String, ConnectApi.WrappedValue>();

           ConnectApi.WrappedValue ingredientsValue = new ConnectApi.WrappedValue();
           ingredientsValue.value = ingredients;
           ConnectApi.WrappedValue dietaryRestrictionsValue = new ConnectApi.WrappedValue();
            dietaryRestrictionsValue.value = dietaryRestrictions;
           ConnectApi.WrappedValue mealTypeValue = new ConnectApi.WrappedValue();
            mealTypeValue.value = mealType;
           ConnectApi.WrappedValue servingsValue = new ConnectApi.WrappedValue();
            servingsValue.value = servings;

          inputParams.put('Input:Ingredients', ingredientsValue);
          inputParams.put('Input:Dietary_Restrictions', dietaryRestrictionsValue);
          inputParams.put('Input:Meal_Type', mealTypeValue);
          inputParams.put('Input:Serving_Size', servingsValue);

          //Will create the configuration which is required for invoking the prompt template
          ConnectApi.EinsteinPromptTemplateGenerationsInput executeTemplateInput = new ConnectApi.EinsteinPromptTemplateGenerationsInput();
          executeTemplateInput.additionalConfig = new ConnectApi.EinsteinLlmAdditionalConfigInput();
          executeTemplateInput.additionalConfig.applicationName = 'PromptBuilderPreview';
          executeTemplateInput.isPreview = false;
          executeTemplateInput.inputParams = inputParams;

          //Invoke the EinsteinLLM APi and execute the prompt template
           ConnectApi.EinsteinPromptTemplateGenerationsRepresentation generationsOutput = ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate(
            'Recipe_Generator',
            executeTemplateInput
          );


          //return the response
         ConnectApi.EinsteinLLMGenerationItemOutput response= generationsOutput.generations[0];
         return response.text;

        }catch(Exception e){
             throw new AuraHandledException('Error generating recipes: ' + e.getMessage());
        }

    }
}