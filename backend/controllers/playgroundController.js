// @desc    Run code in playground
// @route   POST /api/run-code
// @access  Public
const runCode = async (req, res, next) => {
    try {
        const { html = '', css = '', javascript = '' } = req.body;

        // Basic validation
        if (!html && !css && !javascript) {
            return res.status(400).json({
                success: false,
                message: 'At least one code field (html, css, or javascript) is required'
            });
        }

        // Combine code into preview output
        const combinedOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevNest Playground</title>
    <style>
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        ${javascript}
    </script>
</body>
</html>
        `.trim();

        res.status(200).json({
            success: true,
            data: {
                output: combinedOutput,
                html,
                css,
                javascript
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Save playground code (future feature)
// @route   POST /api/playground/save
// @access  Private
const savePlaygroundCode = async (req, res, next) => {
    try {
        // Future implementation: save to database
        res.status(200).json({
            success: true,
            message: 'Feature coming soon'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    runCode,
    savePlaygroundCode
};
