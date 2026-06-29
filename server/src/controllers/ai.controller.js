import * as geminiService from '../services/gemini.service.js';
import * as automationService from '../services/automation.service.js';

export const generateAI = async (req, res) => {

try {

const { prompt, projectId } = req.body;

if (!prompt) {
return res.status(400).json({
success: false,
message: "Prompt required"
});
}

const code = await geminiService.generateCode(prompt);

// 🔥 SAVE VERSION (AUTOMATION CORE)
let project = null;

if (projectId) {
project = await automationService.saveToHistory(
projectId,
req.user.id,
prompt,
code
);
}

return res.json({
success: true,
code,
project
});

} catch (error) {

console.log("AI ERROR:", error);

return res.status(500).json({
success: false,
message: error.message
});

}

};