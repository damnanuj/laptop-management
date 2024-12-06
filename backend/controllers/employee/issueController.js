const Issue = require("../../models/issueModel");

const reportIssue = async (req, res) => {
  try {
    const { laptopId, description, priority, reportedBy } = req.body;
    const issue = new Issue({
      laptopId,
      description,
      priority,
      status: "reported",
      reportedBy,
    });
    await issue.save();
    return res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      issue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error reporting issue",
      error: error.message,
    });
  }
};

module.exports = { reportIssue };
