from fastapi import APIRouter, UploadFile, File
from services.llm import get_llm
from services.rag import process_pdf
from langchain_core.messages import HumanMessage, SystemMessage

router = APIRouter()

SYSTEM_PROMPT = """
You are an expert employment lawyer and HR consultant specialising in Indian labour law.
You analyse employment contracts and offer letters for working professionals.

When given a contract, you must:
1. Identify and explain any unfair, exploitative or legally questionable clauses in plain simple English
2. Highlight what is MISSING that the employee should ask for
3. Flag any clauses that violate Indian labour law
4. Give an overall Risk Score out of 10 (10 = very risky for employee)
5. List 3 specific things the employee should negotiate before signing

Always write as if you are explaining to someone with zero legal knowledge.
Be direct, clear and on the employee's side.
Format your response with clear sections and bullet points.
"""

@router.post("/analyse-contract")
async def analyse_contract(file: UploadFile = File(...)):
    file_bytes = await file.read()
    contract_text = process_pdf(file_bytes)

    llm = get_llm()

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=f"Analyse this employment contract:\n\n{contract_text[:6000]}")
    ]

    response = llm.invoke(messages)

    return {
        "analysis": response.content,
        "status": "success"
    }