(()=>{"use strict";var a={d:(e,r)=>{for(var t in r)a.o(r,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o:(a,e)=>Object.prototype.hasOwnProperty.call(a,e),r:a=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})}},e={};a.r(e),a.d(e,{default:()=>r});const r="attribute vec2 a_position;\r\nattribute vec2 a_normal;\r\nattribute float a_radius;\r\nattribute vec4 a_color;\r\nattribute vec3 a_barycentric;\r\n\r\nuniform mat3 u_matrix;\r\nuniform float u_sqrtZoomRatio;\r\nuniform float u_correctionRatio;\r\n\r\nvarying vec4 v_color;\r\n\r\nconst float minThickness = 1.7;\r\nconst float bias = 255.0 / 254.0;\r\nconst float arrowHeadWidthLengthRatio = 0.66;\r\nconst float arrowHeadLengthThicknessRatio = 2.5;\r\n\r\nvoid main() {\r\n  float normalLength = length(a_normal);\r\n  vec2 unitNormal = a_normal / normalLength;\r\n\r\n  // These first computations are taken from edge.vert.glsl and\r\n  // edge.clamped.vert.glsl. Please read it to get better comments on what's\r\n  // happening:\r\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\r\n  float webGLThickness = pixelsThickness * u_correctionRatio;\r\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\r\n  float adaptedWebGLNodeRadius = a_radius * 2.0 * u_correctionRatio * u_sqrtZoomRatio;\r\n  float adaptedWebGLArrowHeadLength = adaptedWebGLThickness * 2.0 * arrowHeadLengthThicknessRatio;\r\n  float adaptedWebGLArrowHeadHalfWidth = adaptedWebGLArrowHeadLength * arrowHeadWidthLengthRatio / 2.0;\r\n\r\n  float da = a_barycentric.x;\r\n  float db = a_barycentric.y;\r\n  float dc = a_barycentric.z;\r\n\r\n  vec2 delta = vec2(\r\n      da * (adaptedWebGLNodeRadius * unitNormal.y)\r\n    + db * ((adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.y + adaptedWebGLArrowHeadHalfWidth * unitNormal.x)\r\n    + dc * ((adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.y - adaptedWebGLArrowHeadHalfWidth * unitNormal.x),\r\n\r\n      da * (-adaptedWebGLNodeRadius * unitNormal.x)\r\n    + db * (-(adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.x + adaptedWebGLArrowHeadHalfWidth * unitNormal.y)\r\n    + dc * (-(adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.x - adaptedWebGLArrowHeadHalfWidth * unitNormal.y)\r\n  );\r\n\r\n  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;\r\n\r\n  gl_Position = vec4(position, 0, 1);\r\n\r\n  // Extract the color:\r\n  v_color = a_color;\r\n  v_color.a *= bias;\r\n}\r\n";module.exports=e})();