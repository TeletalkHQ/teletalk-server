// const errorReporter = (requestBody, { mongooseError, validatorError }) => {
// 	const errors = [];

// 	Object.keys(mongooseError).length &&
// 		Object.entries(mongooseError).forEach(([key, value]) => {
// 			errors.push({
// 				field: key,
// 				message: value?.message,
// 				type: value?.properties?.type || value?.kind,
// 				value: value.value,
// 			});
// 		});

// 	validatorError.length && validatorError.forEach((err) => {});

// 	return errors;
// };

// errorReporter();
