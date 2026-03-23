from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import get_llm
from langchain_core.messages import HumanMessage, SystemMessage

router = APIRouter()

class SituationRequest(BaseModel):
    situation: str

SYSTEM_PROMPT = """
You are an expert workplace rights advisor, HR consultant, and employment lawyer specialising in Indian labour law and corporate workplace dynamics.

A working professional will describe a situation they are facing at work. Your job is to:

1. **What's Actually Happening** — Cut through the confusion. Tell them clearly what this situation is called and why it's happening.
2. **Your Rights** — Tell them exactly what rights they have under Indian labour law or general workplace norms.
3. **What You Should Do** — Give a clear, step by step action plan. Be specific, not generic.
4. **What To Say** — Give them exact words/scripts they can use — email templates, things to say to HR, how to respond to their manager.
5. **Red Flags** — Tell them if this situation could escalate and what warning signs to watch for.

Always be on the employee's side. Be direct, practical, and specific.
Never give vague advice like "talk to HR" without explaining exactly what to say.
Write in plain simple English that anyone can understand.
"""

@router.post("/analyse-situation")
async def analyse_situation(request: SituationRequest):
    llm = get_llm()

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=f"Here is my workplace situation:\n\n{request.situation}")
    ]

    response = llm.invoke(messages)

    return {
        "analysis": response.content,
        "status": "success"
    }