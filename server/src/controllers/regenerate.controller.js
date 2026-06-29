import * as geminiService from '../services/gemini.service.js';
import * as automationService from '../services/automation.service.js';

export const regenerate = async (req, res) => {

try {

const { projectId, prompt } = req.body;

if (!projectId || !prompt) {
return res.status(400).json({
success: false,
message: "projectId and prompt required"
});
}

const code = await geminiService.generateCode(prompt);

const project = await automationService.regenerateProject(
projectId,
req.user.id,
prompt,
code
);

res.json({
success: true,
code,
project
});

} catch (error) {

res.status(500).json({
success: false,
message: error.message
});

}

};