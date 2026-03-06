import { test } from '@playwright/test';
import { login } from '../utils/login.ts';
import { NewSubmissionPage } from '../pages/newSubmission.page.ts';
import { generateSubmissionTitle } from '../utils/submissionTitle.ts';

test.describe.serial('Submission Workflow', () => {

test('Create New “For Approval” Submission to be terminated by a requester', async ({ page }) => {
    const username = 't2user7';
    const password = 'SqlP@ssw0rd_2023';
    
    const submissionTitle = generateSubmissionTitle();
    const pdf = 'tests/files/Automation Test.pdf';
    const image = 'tests/files/logo.png';
    const approvalType = 'For Approval';
    const actionOfficer = 't2user5';
    const designation = 'Financial Controller';
    const terminateReason = 'only for test';
    const submissionHeader = 'A23';
    const submissionStatusPending = 'Pending Approval'

    const submissionPage = new NewSubmissionPage(page);

    await login(page, username, password);
    
    await submissionPage.clickNewSubmission();
    await submissionPage.selectForApproval();
    
    await submissionPage.fillTitle(submissionTitle);
    await submissionPage.uploadMainPaper(pdf);
    await submissionPage.uploadAttachment(image);
    
    await submissionPage.clickAddFileReference();
    await submissionPage.selectRecentFile();
    await submissionPage.clickAddButton();

    await submissionPage.clickAddStepRouting();
    await submissionPage.clickApprovalTypeDropdown();
    await submissionPage.selectApprovalType(approvalType);
    await submissionPage.fillActionOfficer(actionOfficer);
    await submissionPage.selectActionOfficer(actionOfficer);
    await submissionPage.clickDesignationDropdown();
    await submissionPage.selectDesignation(designation);
    await submissionPage.clickAddDesignationButton();
    await submissionPage.confirmAddStepRouting();

    await submissionPage.clickSubmitNewSubmission();
    await submissionPage.clickConfirmSubmitNewSubmission();
    await submissionPage.verifySubmittedMessage();
    await submissionPage.verifySubmissionTitle(submissionTitle);
    await submissionPage.verifySubmissionHeader(submissionHeader);
    await submissionPage.verifySubmissionHeader(submissionStatusPending);

    await submissionPage.clickTerminateButton();
    await submissionPage.fillTerminateReason(terminateReason);
    await submissionPage.clickConfirmterminate();
  });

  test('Terminated a newly created submission', async ({ page }) => {
    const username = 't2user7';
    const password = 'SqlP@ssw0rd_2023';
    
    const submissionTitle = generateSubmissionTitle();
    const pdf = 'tests/files/Automation Test.pdf';
    const image = 'tests/files/logo.png';
    const approvalType = 'For Approval';
    const actionOfficer = 't2user5';
    const designation = 'Financial Controller';
    const terminateReason = 'only for test';
    const submissionHeader = 'A23';
    const submissionStatusTerminated = 'Terminated'

    const submissionPage = new NewSubmissionPage(page);

    await login(page, username, password);
    
    await submissionPage.clickNewSubmission();
    await submissionPage.selectForApproval();
    
    await submissionPage.fillTitle(submissionTitle);
    await submissionPage.uploadMainPaper(pdf);
    await submissionPage.uploadAttachment(image);
    
    await submissionPage.clickAddFileReference();
    await submissionPage.selectRecentFile();
    await submissionPage.clickAddButton();

    await submissionPage.clickAddStepRouting();
    await submissionPage.clickApprovalTypeDropdown();
    await submissionPage.selectApprovalType(approvalType);
    await submissionPage.fillActionOfficer(actionOfficer);
    await submissionPage.selectActionOfficer(actionOfficer);
    await submissionPage.clickDesignationDropdown();
    await submissionPage.selectDesignation(designation);
    await submissionPage.clickAddDesignationButton();
    await submissionPage.confirmAddStepRouting();

    await submissionPage.clickSubmitNewSubmission();
    await submissionPage.clickConfirmSubmitNewSubmission();

    await submissionPage.clickTerminateButton();
    await submissionPage.fillTerminateReason(terminateReason);
    await submissionPage.clickConfirmterminate();
    await submissionPage.verifyTerminatedMessage();
    await submissionPage.verifySubmissionHeader(submissionHeader);
    await submissionPage.verifySubmissionHeader(submissionStatusTerminated);
    await submissionPage.closeTerminatedMessage();

    await submissionPage.clickParticipatedButton();
    await submissionPage.clickCompletedTab();
    await submissionPage.verifySubmissionStatus(submissionTitle,submissionStatusTerminated);

  });

});