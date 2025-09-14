import { number, setLocale, string, addMethod } from "yup";


function errorMessage() {
  addMethod(string, "email", function () {
    console.log("localStorage.value from yap", localStorage.lang);
    const message =
      localStorage.lang === "en" ? "invalid email format" : "صيغة البريد الإلكتروني غير صحيحة"
    return this.test("email", message, function (value) {
      console.log("this", this)
      const { path, createError } = this;
      const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}(?:\.[A-Z|a-z]{2,})?$/;
      return (
       (emailRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "phoneEg", function () {
    const message =
      localStorage.lang === "en" ? "invalid phone number format" : "صيغة رقم الجوال غير صحيحة"
    return this.test("phone", message, function (value) {
      const { path, createError } = this;
      const phoneRegex = /^01[0125][0-9]{8}$/;
      return (
       (phoneRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "phoneSa", function () {
    const message =
      localStorage.lang === "en" ? "invalid phone number format" : "صيغة رقم الجوال غير صحيحة"
    return this.test("phone", message, function (value) {
      const { path, createError } = this;
      const saPhoneRegexIntl = /^(?:\+966|00966|966)5[0-9]{8}$/;
      const saPhoneRegexLocal = /^(?:05[0-9]{8}|(?:\+966|00966|966)5[0-9]{8})$/;
      const saPhoneRegex = /^05[0-9]{8}$/;
      return (
       (saPhoneRegex.test(value)) ||
        createError({ path, message: message })
      );
    })
  });

  addMethod(string, "length", function (length) {
    const message =
      localStorage.lang === "en"
        ? `must be exactly ${length} characters`
        : `يجب ان يكون ${length} حروف بالضبط`;
    return this.test("length", message, function (value) {
      const { path, createError } = this;
      return (
        (value?.length === length) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "arabicOnly", function () {
    const message =
      localStorage.lang === "en"
        ? "must contain only Arabic letters"
        : "يجب ان يحتوي على حروف عربية فقط";
    return this.test("arabicOnly", message, function (value) {
      const { path, createError } = this;
      const arabicRegex = /^[\u0600-\u06FF\s]*$/;
      return (
       (arabicRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  })

  addMethod(string, "englishOnly", function () {
    const message =
      localStorage.lang === "en"
        ? "must contain only English letters"
        : "يجب ان يحتوي على حروف انجليزية فقط";
    return this.test("englishOnly", message, function (value) {
      const { path, createError } = this;
      const englishRegex = /^[a-zA-Z\s]*$/;
      return (
       (englishRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "password", function () {
    const message =
      localStorage.lang === "en"      ? "password must be at least 8 characters, and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      : "يجب ان يكون كلمة المرور على الاقل 8 حروف ويحتوي على حرف كبير وحرف صغير ورقم وحرف خاص";
    return this.test("password", message, function (value) {
      const { path, createError } = this;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return (
       (passwordRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "noSpecialChars", function () {
    const message =
      localStorage.lang === "en"
        ? "must not contain special characters"
        : "يجب ان لا يحتوي على حروف خاصة";    
    return this.test("noSpecialChars", message, function (value) {
      const { path, createError } = this;
      const noSpecialCharsRegex = /^[A-Za-z0-9\s]*$/;
      return (
       (noSpecialCharsRegex.test(value)) ||
        createError({ path, message: message })
      );  
    });
  });

  addMethod(string, "numbersOnly", function () {
    const message =
      localStorage.lang === "en"
        ? "must contain only numbers"
        : "يجب ان يحتوي على ارقام فقط"; 
    return this.test("numbersOnly", message, function (value) {
      const { path, createError } = this;
      const numbersOnlyRegex = /^[0-9\s]*$/;
      return (
       (numbersOnlyRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  }); 

  addMethod(string, "noZero", function () { 
    const message =
      localStorage.lang === "en"
        ? "must not be zero"
        : "يجب ان لا يكون صفر";
    return this.test("noZero", message, function (value) {
      const { path, createError } = this;
      return (
        (value !== "0" && value !== 0) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "notSpecial", function () {
    localStorage.lang == "en"
        ? "Allowed to use characters and numbers only"
        : "يسمح فقط الحروف والارقام";
    return this.test("notSpecial", message, function (value) {
      const { path, createError } = this;
      const notSpecialRegex = /^[a-zA-Z0-9\u0600-\u06FF ]*$/;
      return (
       (notSpecialRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "englishWithNumbers", function () {
    const message =
      localStorage.lang == "en"
        ? "Allowed to use English characters and numbers only"
        : "يسمح فقط الحروف الانجليزية والارقام";
    return this.test("englishWithNumbers", message, function (value) {
      const { path, createError } = this;
      const englishWithNumbersRegex = /^[a-zA-Z0-9 ]*$/;
      return (
       (englishWithNumbersRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });

  addMethod(string, "arabicWithNumbers", function () {
    const message =
      localStorage.lang == "en" 
        ? "Allowed to use Arabic characters and numbers only"
        : "يسمح فقط الحروف العربية والارقام";
    return this.test("arabicWithNumbers", message, function (value) {
      const { path, createError } = this;
      const arabicWithNumbersRegex = /^[\u0600-\u06FF0-9 ]*$/;
      return (
       (arabicWithNumbersRegex.test(value)) ||
        createError({ path, message: message })
      );
    });
  });


if (localStorage.lang !== "en") {
  setLocale({
      mixed: {
        default: "${path} غير صالح",
        required: "${path} مطلوب",
        notType: "هذا الحقل غير صالح",
        oneOf: "يجب ان يكون ${path} من ${values}",
        notOneOf: "يجب ان لا يكون ${path} من ${values}",
        defined: "${path} يجب ان يكون معرف",
        notDefined: "${path} يجب ان لا يكون معرف",
        notNullable: "${path} يجب ان لا يكون فارغ",
        notUndefined: "${path} يجب ان لا يكون معرف",
        is: "يجب ان يكون ${path} هو ${value}",
        isNot: "يجب ان لا يكون ${path} هو ${value}",
        equals: "يجب ان يكون ${path} مساويا ل ${value}",
        notEquals: "يجب ان لا يكون ${path} مساويا ل ${value}",
        required_if: "${path} مطلوب عندما يكون ${other} هو ${value}",
      },
      string: {
        length: "يجب ان يكون ${path} بطول ${length} حروف",
        min: "يجب ان يكون ${path} على الاقل ${min} حروف",
        max: "يجب ان لا يزيد ${path} عن ${max} حروف",
        matches: "${path} غير صالح",
        email: "صيغة البريد الإلكتروني غير صحيحة",
        url: "${path} يجب ان يكون رابط صالح",
        trim: "${path} يجب ان لا يحتوي على مسافات في البداية او النهاية",
        lowercase: "${path} يجب ان يكون حروف صغيرة",
        uppercase: "${path} يجب ان يكون حروف كبيرة",
        phoneEg: "صيغة رقم الجوال غير صحيحة",
        phoneSa: "صيغة رقم الجوال غير صحيحة",
        arabicOnly: "يجب ان يحتوي على حروف عربية فقط",
        englishOnly: "يجب ان يحتوي على حروف انجليزية فقط",
        password: "يجب ان يكون كلمة المرور على الاقل 8 حروف ويحتوي على حرف كبير وحرف صغير ورقم وحرف خاص",
        noSpecialChars: "يجب ان لا يحتوي على حروف خاصة",
        numbersOnly: "يجب ان يحتوي على ارقام فقط",
        noZero: "يجب ان لا يكون صفر",
        notSpecial: "يسمح فقط الحروف والارقام",
        englishWithNumbers: "يسمح فقط الحروف الانجليزية والارقام",
        arabicWithNumbers: "يسمح فقط الحروف العربية والارقام",

      },
      number: {
        min: "يجب ان يكون ${path} على الاقل ${min}",
        max: "يجب ان لا يزيد ${path} عن ${max}",
        lessThan: "يجب ان يكون ${path} اقل من ${less}",
        moreThan: "يجب ان يكون ${path} اكبر من ${more}",
        positive: "يجب ان يكون ${path} رقم موجب",
        negative: "يجب ان يكون ${path} رقم سالب",
        integer: "يجب ان يكون ${path} عددا صحيحا",
        typeError: "${path} يجب ان يكون رقما",
        notType: "${path} يجب ان يكون رقما",
        required: "${path} مطلوب",
        defined: "${path} يجب ان يكون معرف",
        notDefined: "${path} يجب ان لا يكون معرف",
        notNullable: "${path} يجب ان لا يكون فارغ",
        notUndefined: "${path} يجب ان لا يكون معرف",
        is: "يجب ان يكون ${path} هو ${value}",
        isNot: "يجب ان لا يكون ${path} هو ${value}",
        equals: "يجب ان يكون ${path} مساويا ل ${value}",
        notEquals: "يجب ان لا يكون ${path} مساويا ل ${value}",
        required_if: "${path} مطلوب عندما يكون ${other} هو ${value}",
      },
      date: { 
        min: "يجب ان يكون ${path} بعد ${min}",
        max: "يجب ان يكون ${path} قبل ${max}",
        lessThan: "يجب ان يكون ${path} قبل ${less}",
        moreThan: "يجب ان يكون ${path} بعد ${more}",
        typeError: "${path} يجب ان يكون تاريخا",
        notType: "${path} يجب ان يكون تاريخا",
        required: "${path} مطلوب",
      },
      array: {
        min: "يجب ان يحتوي على الاقل ${min} عناصر",
        max: "يجب ان لا يحتوي على اكثر من ${max} عناصر",
      },
      boolean: {
        isValue: "يجب ان يكون ${path} هو ${value}",
        notValue: "يجب ان لا يكون ${path} هو ${value}",
      },
      object: {
        noUnknown: "${path} يحتوي على حقول غير معروفة",
      },
     
    }); 
  }

}







export default errorMessage;




 