import { expect } from '@playwright/test';
import { Page, FrameLocator } from '@playwright/test';

export class NewSubmissionPage {
  readonly page: Page;
  readonly frame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('frame[name="mainFrame"], iframe[name="mainFrame"]');
  }

  async clickNewSubmission() {
    await this.frame.locator('#newSubmission').click();
  }

  async selectForApproval() {
    await this.frame.locator('//*[@class="qtip-content"]//a[@onclick="forwardToNewEsub(1,\'For Approval\')"]').click();
  }

  async fillTitle(title: string) {
    await this.page.locator('#wfRequest\\.title').fill(title);
  }

  async uploadMainPaper(pdf: string) {
    await this.page.locator('#uploadPDF').setInputFiles(pdf);
  }

  async uploadAttachment(image: string) {
    await this.page.locator('#uploadedAttachment').setInputFiles(image);
  }

  async clickAddFileReference() {
    await this.page.locator('#FileReGuide .actionBtns.addBnt').click();
  }

  async selectRecentFile() {
    await this.page.locator('[aria-modal="true"] #pane-recent input[type="checkbox"]').first().click();
  }

  async clickAddButton() {
    await this.page.locator('#addBtn').click();
  }
  
  async clickAddStepRouting() {
    await this.page.locator('#RoutingGuide .actionBtnValue.addValue').click();
  }

  async clickApprovalTypeDropdown() {
    await this.page.locator('#approvalType .el-select').click();
  }

  async selectApprovalType(approvalType: string) {
    await this.page.locator(`.el-scrollbar li:has-text("${approvalType}")`).click();
  }
  
  async fillActionOfficer(actionOfficer: string) {
    await this.page.locator('[aria-modal="true"] .select2-search__field').fill(actionOfficer);
  }

  async selectActionOfficer(actionOfficer: string) {
    await this.page.locator(`.select2-results li:has-text("${actionOfficer}")`).click();
  }

  async clickDesignationDropdown() {
    await this.page.locator('#selectDesignationId').click();
  }

  async selectDesignation(designation: string) {
    await this.page.locator(`.el-scrollbar li:has-text("${designation}")`).click();
  }

  async clickAddDesignationButton() {
    await this.page.locator('#addSDBtn').click();
  }

  async confirmAddStepRouting() {
    await this.page.locator('#routingProfileDialog .dialogBottom #addBtn').click();
  }

  async clickSubmitNewSubmission() {
    await this.page.locator('#newsubBottomId .submitbtn').click();
  }

  async clickConfirmSubmitNewSubmission() {
    await this.page.locator('.dialogBottom .actionAddBtnText', { hasText: 'Submit' }).click();
  }

  async verifySubmittedMessage() {
     await expect(this.page.locator('#el-drawer__title [role="heading"]', { hasText: "Submitted successfully." })).toBeVisible();
  }

  async verifyTerminatedMessage() {
     await expect(this.page.locator('.el-drawer__body .succmessage div', { hasText: "Terminated Successfully." })).toBeVisible();
  }

  async closeTerminatedMessage() {
    await this.page.locator('#nextStepNotify .el-drawer__container .el-drawer__close-btn').click();
  }

  async verifySubmissionTitle(submissionTitle: string) {
    const title = this.page.locator("//*[@class='Information-Metadata'][contains(.,'Title :')]/following-sibling::*");

    await expect(title).toHaveText(submissionTitle);
  }

  async verifySubmissionHeader(submissionHeader: string) {
    const header = this.page.locator("#viewheaders .viewheader-title");

    await expect(header).toContainText(submissionHeader);
  } 

  async clickTerminateButton() {
    await this.page.locator("//*[@class='approvebtn'][contains(.,'Withdraw')]/following-sibling::*[@class='rejectbtn']").click();
  }
  
  async fillTerminateReason(terminateReason: string) {
    await this.page.locator('#nextStepInput textarea').fill(terminateReason);
  }

  async clickConfirmterminate() {
    await this.page.locator('.actionPost div:has-text("Terminate")').click();
  }

  async clickParticipatedButton() {
    await this.page.locator('.naviga-detail .naviga-title', { hasText: 'Participated' }).click();
  }

  async clickCompletedTab() {
    await this.page.locator(".el-tabs__nav-scroll [role='tablist'] div", { hasText: 'Completed' }).click();
  }

  async verifySubmissionStatus(submissionTitle: string,submissionStatus: string) {
    const status = this.page.locator(`xpath=//*[contains(.,'${submissionTitle}')]/ancestor::*[contains(@class,'inprogress-submissiodtitle1')]/following-sibling::*[@class='inprogress-status1']`);

    await expect(status).toHaveText(submissionStatus);
  }
  
}