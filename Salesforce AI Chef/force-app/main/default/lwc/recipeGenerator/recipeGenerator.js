import { LightningElement } from 'lwc';
import generateAIRecipes from '@salesforce/apex/AIRecipeController.generateAIRecipes'
export default class RecipeGenerator extends LightningElement {
    formData={}
    recipes = []
    isGenerating = false
    error=''

    async generateRecipes(event){
        this.error= ''
        
        this.formData = event.detail.formData
        console.log("this.formData", JSON.stringify(this.formData));
        if(!this.formData?.ingredients){
            this.error = 'Please enter ingredients'
            return
        }
        if(!this.formData?.mealType){
            this.error = 'Please enter meal type'
            return
        }
        this.isGenerating = true
        try{
            const result = await generateAIRecipes({
                ingredients:this.formData.ingredients,
                dietaryRestrictions:this.formData.dietaryRestrictions,
                mealType:this.formData.mealType,
                servings:this.formData.servings
            })
            console.log("result", result)
            this.formatResponse(result)
        }catch(error){
            console.error("Error generating recipes:", error)
            this.error = error.body?.message || error.message ||'An unexpected error occurred';
        } finally{
            this.isGenerating = false
        }
        
    }

    formatResponse(result){
        const correctJson = result.replaceAll(/[\n\u00A0]/g, '').trim()
        const parsedResponse = JSON.parse(correctJson)

        if(parsedResponse?.recipes?.length>0){
            this.recipes = parsedResponse.recipes.map(recipe=>{
                if(!recipe.tags){
                    recipe.tags = []
                }
                if(!recipe.total_time){
                    const prepTime = parseInt(recipe.prep_time) || 0;
                    const cookTime = parseInt(recipe.cook) || 0;
                    recipe.total_time = `${prepTime + cookTime} min`
                }
                return recipe
            })
        } else {
            this.error = 'No recipes were generated. Please try again with different inputs'
            this.recipes = []
        }

    }
}