from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import get_llm
from langchain_core.messages import HumanMessage, SystemMessage

router = APIRouter()

class SalaryRequest(BaseModel):
    role: str
    experience: int
    location: str
    current_salary: float
    skills: str
    company_size: str

SYSTEM_PROMPT = """
You are an expert salary intelligence analyst and compensation consultant specialising in the Indian job market.

A professional will give you their details — role, experience, location, current salary, skills, and company size.

Your job is to:

1. **Market Rate Analysis** — Give a realistic salary range for this exact profile in the Indian market right now. Give minimum, median, and maximum figures in LPA (Lakhs Per Annum).

2. **Are You Underpaid?** — Compare their current salary to the market rate. Tell them honestly if they are underpaid, overpaid, or fairly paid and by how much.

3. **Salary Influencers** — List the specific factors that are pushing their salary up or down — skills in demand, location premium, company size impact, experience level.

4. **Negotiation Strategy** — Give them a specific number to ask for and exactly how to ask for it. Include the exact words to say in a salary negotiation conversation.

5. **Skills That Will Increase Your Salary** — List 3-5 specific skills they should add to jump to the next salary bracket. Be specific, not generic.

6. **Best Companies To Target** — Name specific types of companies or sectors where their profile would command a higher salary.

Always give specific numbers, not ranges like "it depends". Be direct and actionable.
All salary figures must be in Indian Rupees (LPA - Lakhs Per Annum).
"""

@router.post("/analyse-salary")
async def analyse_salary(request: SalaryRequest):
    llm = get_llm()

    user_message = f"""
Role: {request.role}
Years of Experience: {request.experience}
Location: {request.location}
Current Salary: {request.current_salary} LPA
Key Skills: {request.skills}
Company Size: {request.company_size}
"""

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=f"Analyse my salary situation:\n{user_message}")
    ]

    response = llm.invoke(messages)

    return {
        "analysis": response.content,
        "status": "success"
    }