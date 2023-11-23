
  const validations = (input) => {
    let errors = {};
    
 
  let validationName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/
  let validationUrl = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/;
  let validationDate = /^\d{4}-\d{2}-\d{2}$/;

  
  if (!input.name || !validationName.test(input.name) || input.name.length > 50) {
    errors.name = "You must enter an unique name and it must contain up to 50 characters"
  }

  if (!validationUrl.test(input.image)){
    errors.image = "Invalid URL";
  }
  if (!input.image) {
      errors.image = "You must enter an image URL";
    }

    if (!input.description || input.description?.length < 10 || input.description.length > 1000 ) {
      errors.description = "You must enter a description and it must contain between 10 and 1000 characters"
    }

    if (!input.released) {
      errors.released = "You must enter a released date"
    }
    
    if (!validationDate.test(input.released)) {
      errors.released = "The date format must be YYYY-MM-DD"
    }

    if(!input.rating){
      errors.rating = "You must enter a rating"

    }

    if(input.rating?.length > 5 || input.rating?.length < 0){
      errors.rating = "Enter a rating between 0 and 5"

    }
    
    if (!input.genres || input.genres?.length === 0) {
      errors.genres = "Enter at least one genre";
    }
    
    if (!input.platforms || input.platforms?.length === 0) {
      errors.platforms = "Enter at least one platform";
    }
    

    return errors
  }
  
export default validations;