from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.llm import get_llm
from langchain_core.messages import HumanMessage, SystemMessage

router = APIRouter()

class BurnoutRequest(BaseModel):
    workload: int        # 1-10
    sleep_quality: int   # 1-10
    mood: int            # 1-10
    control: int         # 1-10
    recognition: int     # 1-10
    personal_note: str   # optional free text

SYSTEM_PROMPT = """
You are an expert occupational psychologist and workplace wellness advisor specialising in burnout detection and prevention.

A professional has completed a weekly check-in with scores across 5 dimensions:
- Workload (1=overwhelming, 10=manageable)
- Sleep Quality (1=terrible, 10=excellent)
- Mood (1=very low, 10=very high)
- Control over work (1=no control, 10=full control)
- Recognition (1=completely unrecognised, 10=fully valued)

They may also have added a personal note about their week.

Your job is to:

1. **Burnout Risk Score** — Give an overall burnout risk score out of 100 (0=no risk, 100=severe burnout). Be honest.

2. **Burnout Stage** — Identify which stage they are at:
   - 🟢 Healthy — No significant risk
   - 🟡 Early Warning — Signs of stress building up
   - 🟠 Caution — Moderate burnout risk, action needed
   - 🔴 High Risk — Serious burnout risk, immediate action required

3. **What's Draining You Most** — Based on their scores, identify the single biggest factor causing their stress and explain why.

4. **This Week's Action** — Give them ONE specific, actionable thing to do THIS WEEK to reduce their burnout risk. Be very specific, not generic advice like "take a break".

5. **Warning Signs To Watch** — Tell them 3 specific signs that would indicate their situation is getting worse.

Be compassionate but honest. Keep the response concise and practical.
"""

@router.post("/check-burnout")
async def check_burnout(request: BurnoutRequest):
    llm = get_llm()

    user_message = f"""
Weekly Check-in Scores:
- Workload: {request.workload}/10
- Sleep Quality: {request.sleep_quality}/10
- Mood: {request.mood}/10
- Control over work: {request.control}/10
- Recognition: {request.recognition}/10

Personal note: {request.personal_note if request.personal_note else "None provided"}
"""

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=user_message)
    ]

    response = llm.invoke(messages)

    return {
        "analysis": response.content,
        "status": "success"
    }