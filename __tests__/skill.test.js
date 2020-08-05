const SkillService = require('../src/services/skill.service');
const SkillDAO = require('../src/dao/skill.dao');
const mySkills = new SkillService();
const SkillDetails = new SkillDAO();

test("test if addSkill function defined in the service", async () => {
    expect(await mySkills.addSkill({
        user_type: 4,
        user_id: 5,
        name: "new",
        description: "something"
    })).toBeDefined();
});

test("test if the skill_name property exist in the body of the request object", async () => {
    expect(await mySkills.addSkill({
        user_type: 2,
        user_id: 5,
        description:"something"
    })).toBe("Sorry! We couldn't add the skill. SequelizeValidationError: notNull Violation: skills.skill_name cannot be null");
});

test("test if the length of skill_name exceeds 60", async () => {
    expect(await mySkills.addSkill({
        user_type: 2,
        user_id: 5,
        name:"abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
        description:"something"
    })).toBe("Sorry! We couldn't add the skill. SequelizeValidationError: Validation error: Validation len on skill_name failed");
});

test("test if addSkillDetails function defined in the DAO", async () => {
    expect(await SkillDetails.addSkillDetails(2,5,"something","anything")).toBeDefined();
});

test("test if approval_status working correctly for managers", async () => {
    await SkillDetails.addSkillDetails(1,5,"something","anything");
    expect(SkillDAO.approval_status).toBe(1);
})

test("test if approval_status working correctly for resources", async () => {
    await SkillDetails.addSkillDetails(2,5,"something","anything");
    expect(SkillDAO.approval_status).toBe(0);
})
